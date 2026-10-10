// Checks the static export against the hosting budget.
// Target < 5 MB (team budget), hard limit 20 MB (course web). Exits 1 when the hard limit is exceeded.
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const TARGET = 5 * 1024 * 1024;
const HARD_LIMIT = 20 * 1024 * 1024;

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, acc);
    else acc.push({ path: p, size: s.size });
  }
  return acc;
}

const mb = (n) => (n / 1024 / 1024).toFixed(2) + " MB";

let files;
try {
  files = walk(OUT);
} catch {
  console.error(`No "${OUT}" folder. Run "pnpm build" first.`);
  process.exit(1);
}

const total = files.reduce((a, f) => a + f.size, 0);
const byType = {};
for (const f of files) {
  const ext = f.path.split(".").pop().toLowerCase();
  byType[ext] = (byType[ext] ?? 0) + f.size;
}

console.log(`Static export: ${files.length} files, ${mb(total)} total`);
console.log(
  Object.entries(byType)
    .sort((a, b) => b[1] - a[1])
    .map(([ext, size]) => `  .${ext.padEnd(5)} ${mb(size)}`)
    .join("\n"),
);
console.log("Largest files:");
for (const f of files.sort((a, b) => b.size - a.size).slice(0, 8)) {
  console.log(`  ${mb(f.size).padStart(9)}  ${f.path}`);
}

if (total > HARD_LIMIT) {
  console.error(`FAIL: ${mb(total)} exceeds the 20 MB course limit.`);
  process.exit(1);
}
if (total > TARGET) {
  console.warn(`WARN: ${mb(total)} exceeds the 5 MB team target.`);
  process.exit(process.env.SIZE_STRICT ? 1 : 0);
}
console.log(`OK: within the 5 MB target (${((total / TARGET) * 100).toFixed(0)}% used).`);
