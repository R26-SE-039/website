// Next 16 static export writes segment prefetch payloads as
//   out/<route>/__next.<segment>/__PAGE__.txt
// while the client router requests
//   /<route>/__next.<segment>.__PAGE__.txt
// (observed with `trailingSlash: true`). The miss only costs a 404 on link
// prefetch, but it shows up in the browser console and in audits, so mirror
// each payload to the requested name. Idempotent; safe to run repeatedly.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
if (!existsSync(OUT)) {
  console.error('No "out" folder. Run "next build" first.');
  process.exit(1);
}

let mirrored = 0;
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (!statSync(p).isDirectory()) continue;
    if (entry.startsWith("__next.")) {
      for (const file of readdirSync(p)) {
        const target = join(dir, `${entry}.${file}`);
        if (!existsSync(target)) {
          copyFileSync(join(p, file), target);
          mirrored++;
        }
      }
    } else {
      walk(p);
    }
  }
}
walk(OUT);
console.log(`postbuild: mirrored ${mirrored} segment prefetch file(s).`);
