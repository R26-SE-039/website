# NextGen QA — research website (R26-SE-039)

Static Next.js site for the SLIIT research project. Read `CLAUDE.md` (build brief) and
`docs/website-guidelines.md` (course requirements) before changing anything.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export to out/ (+ prefetch mirror step)
pnpm preview    # serve out/ on http://localhost:3005
pnpm size       # size budget (5 MB target, 20 MB course limit)
pnpm perf       # Lighthouse mobile audit of every route, one run (>= 95 in every category)
pnpm check      # build + size + Lighthouse median of 3 runs — run before every commit
```

Content lives only in `src/data/*`. Anything unknown is a visible `TODO`.
Upload the contents of `out/` to the course web. For sub-folder hosting set
`NEXT_PUBLIC_BASE_PATH=/your-folder` before `pnpm build`.
