// Serves the static export from an in-process Node server (no port leaks, no
// external dependency) and audits every route with Lighthouse (mobile preset).
// Fails when any category on any route scores below the threshold (default 95).
// Lighthouse itself runs through `pnpm dlx`, so it never enters the site bundle.
import { spawn } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { createGzip } from "node:zlib";

// Text types are gzipped like any real static host (Apache, nginx, Vercel) does;
// auditing uncompressed transfers would under-report the site by ~10 points.
const COMPRESSIBLE = new Set([".html", ".css", ".js", ".mjs", ".json", ".txt", ".svg", ".xml"]);

const OUT = "out";
const PORT = Number(process.env.LH_PORT ?? 3005);
const BASE = `http://localhost:${PORT}`;
const THRESHOLD = Number(process.env.LH_THRESHOLD ?? 95);
// Single Lighthouse runs vary by a few points on a busy laptop; gate on the median of N runs.
// `--runs=3` (used by `pnpm check`) or LH_RUNS=3; default is one quick run.
const runsArg = process.argv.find((a) => a.startsWith("--runs="))?.split("=")[1];
const RUNS = Math.max(1, Number(runsArg ?? process.env.LH_RUNS ?? 1));
const ROUTES = (process.env.LH_ROUTES ?? "/,/domain/,/milestones/,/documents/,/presentations/,/about/,/contact/").split(",");
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

if (!existsSync(OUT)) {
  console.error(`No "${OUT}" folder. Run "pnpm build" first.`);
  process.exit(1);
}
mkdirSync(".lighthouse", { recursive: true });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".xml": "application/xml",
};

// Behaves like a plain static host: folder -> index.html, unknown -> 404.html, no SPA fallback.
function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  let p = normalize(join(OUT, clean));
  if (!p.startsWith(normalize(OUT))) return null;
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!existsSync(p) && !extname(p)) p = `${p}.html`;
  return existsSync(p) && statSync(p).isFile() ? p : null;
}

const server = createServer((req, res) => {
  const file = resolveFile(req.url ?? "/");
  if (!file) {
    const nf = join(OUT, "404.html");
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    if (existsSync(nf)) createReadStream(nf).pipe(res);
    else res.end("Not found");
    return;
  }
  const ext = extname(file).toLowerCase();
  const headers = {
    "content-type": MIME[ext] ?? "application/octet-stream",
    "cache-control": "public, max-age=31536000, immutable",
  };
  const gzip = COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  if (gzip) {
    headers["content-encoding"] = "gzip";
    headers.vary = "accept-encoding";
  }
  res.writeHead(200, headers);
  const stream = createReadStream(file);
  if (gzip) stream.pipe(createGzip({ level: 6 })).pipe(res);
  else stream.pipe(res);
});

await new Promise((resolve, reject) => {
  server.once("error", (err) => {
    reject(new Error(err.code === "EADDRINUSE" ? `Port ${PORT} is already in use; stop that process first.` : String(err)));
  });
  server.listen(PORT, "127.0.0.1", resolve);
}).catch((err) => {
  console.error(err.message);
  process.exit(1);
});

const isWin = process.platform === "win32";
const pnpm = isWin ? "pnpm.cmd" : "pnpm";

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: isWin });
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

const rows = [];
let failed = false;

try {
  const median = (values) => {
    const s = [...values].sort((a, b) => a - b);
    return s[Math.floor(s.length / 2)];
  };

  for (const route of ROUTES) {
    const name = route === "/" ? "home" : route.replaceAll("/", "").replace(/[^a-z0-9-]/g, "-");
    const samples = [];
    for (let i = 0; i < RUNS; i++) {
      const outPath = `.lighthouse/${name}${RUNS > 1 ? `-${i + 1}` : ""}.json`;
      await run(pnpm, [
        "dlx",
        "lighthouse",
        BASE + route,
        "--quiet",
        // With shell:true on Windows an argument containing a space must be quoted by hand.
        isWin ? '"--chrome-flags=--headless=new --no-sandbox"' : "--chrome-flags=--headless=new --no-sandbox",
        "--only-categories=" + CATEGORIES.join(","),
        "--output=json",
        "--output-path=" + outPath,
        "--form-factor=mobile",
      ]);
      const report = JSON.parse(readFileSync(outPath, "utf8"));
      samples.push(Object.fromEntries(CATEGORIES.map((c) => [c, Math.round((report.categories[c]?.score ?? 0) * 100)])));
    }
    const scores = Object.fromEntries(CATEGORIES.map((c) => [c, median(samples.map((s) => s[c]))]));
    const ok = Object.values(scores).every((s) => s >= THRESHOLD);
    if (!ok) failed = true;
    rows.push({ route, ...scores, ok, runs: RUNS });
  }
} finally {
  server.close();
}

console.log("\nLighthouse (mobile) — threshold " + THRESHOLD);
console.table(rows);
if (failed) {
  console.error("FAIL: at least one route is below the threshold. Reports in .lighthouse/*.json");
  process.exit(1);
}
console.log("OK: every route meets the budget.");
