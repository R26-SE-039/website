# CLAUDE.md — NextGen QA Research Website

Build brief for the project website of SLIIT research group **R26-SE-039 — NextGen QA**.
Read this file and `docs/website-guidelines.md` (the official SLIIT requirements) before writing any code.

---

## 0. Workspace rules (added for this repo)

- **Package manager: pnpm only.** Never run `npm` or `yarn` here. Lockfile is `pnpm-lock.yaml`.
- **Next.js 16 App Router with Turbopack.** `cacheComponents` is disabled because the site is a
  static export.
- **Performance is verified by scripts, not by feel.** Run `pnpm check` (build + size + Lighthouse)
  before every commit that touches pages. Budgets: `out/` < 5 MB, Lighthouse mobile
  Performance / Accessibility / Best Practices / SEO ≥ 95.
- **Demo "wow" content is additive and must stay within budget.** The viva-panel showcase (dashboard
  video, animated loop, live API docs link) is planned in §15 and must follow those rules.
- Commits: short lowercase messages, one logical step each, no AI attribution lines.

---

## 1. Project overview

- **What:** A static, fast, attractive website presenting the research project
  *NextGen QA — An AI-Powered Closed-Loop QA Automation Platform*.
- **Audience:** Examiners, supervisors, the research panel and public visitors.
- **Required sections (from the SLIIT guidelines):** Home, Domain, Milestones, Documents,
  Presentations (slides), About us, Contact us.
- **Reference:** Past senior sites at http://cdap.sliit.lk/ (ours must look more modern and consistent).

---

## 2. Hard constraints (non-negotiable)

1. **Static export only.** `output: "export"` in `next.config.ts`. No API routes, route handlers,
   server actions, middleware, ISR, `next/headers`, cookies or any feature needing a Node server.
2. **Hosting:** the course web allows WordPress/HTML/CSS and has a **20 MB maximum**. The build
   output (`out/`) must be plain static files. Target **< 5 MB total**.
3. **No large binaries in the repo.** PDFs, DOCX and slide decks are linked externally
   (Google Drive / OneDrive). Never commit them to `public/`.
4. **Images:** SVG for logos and diagrams, WebP for photos. `images: { unoptimized: true }`.
   Team photos ≤ 400×400 px and ≤ 60 KB each. **No video files in the repo, no raster hero background.**
   A demo video is allowed only as an externally hosted embed loaded on click (see §15).
5. **Minimal JavaScript.** Server Components by default. `"use client"` only for: mobile menu,
   navbar dropdowns, Domain scroll-spy, opening a milestone from the URL hash, back-to-top button,
   copy-to-clipboard, the click-to-play video facade. Use native `<details>/<summary>` for accordions.
6. **Allowed dependencies only:** `next`, `react`, `react-dom`, `tailwindcss` (+ its Turbopack/PostCSS plugin),
   `lucide-react`, `clsx`. **Ask before adding anything else.** No UI kits (MUI, Chakra, shadcn
   CLI bundles), no animation libraries, no analytics. Tooling that runs via `pnpm dlx` (serve, lighthouse)
   is fine because it never enters the bundle.
7. **Sub-folder hosting:** support an optional base path through `NEXT_PUBLIC_BASE_PATH`.
   All files from `public/` must be referenced through the `asset()` helper (see §11),
   because `next/image` does not add `basePath` to `src` automatically.
8. **Accessibility:** WCAG AA contrast, full keyboard navigation, visible focus rings,
   `alt` text on every image, semantic landmarks (`header`, `nav`, `main`, `footer`),
   one `<h1>` per page, and respect for `prefers-reduced-motion`.

---

## 3. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), TypeScript `strict` |
| Styling | Tailwind CSS v4 (tokens via `@theme` in `globals.css`) |
| Fonts | `next/font` — Geist Sans (body/headings) + Geist Mono (badges/code), self-hosted at build |
| Icons | `lucide-react` (named imports only) |
| Class merging | `clsx` |
| Hosting | Static files from `out/` uploaded to the course web; Vercel/GitHub Pages optional for previews |

---

## 4. Commands

```bash
pnpm dev               # local development
pnpm build             # static export to /out
pnpm preview           # serve the exported site on http://localhost:3005 (next start does NOT work with output: export)
pnpm size              # total size of out/ against the 5 MB target and 20 MB hard limit
pnpm perf              # Lighthouse (mobile) on every route of the exported site, one run, fails below 95
pnpm check             # build + size + Lighthouse median of 3 runs (the commit gate; ~8 minutes)
                       # options: LH_ROUTES=/domain/ pnpm perf · LH_THRESHOLD=90 · node scripts/lighthouse.mjs --runs=5
```

---

## 5. Configuration

```ts
// next.config.ts
import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,          // /domain/ -> domain/index.html
  images: { unoptimized: true },
  basePath,
};

export default nextConfig;
```

---

## 6. Project structure

```
website/
├── CLAUDE.md
├── docs/
│   └── website-guidelines.md        # SLIIT requirements (source of truth for sections)
├── scripts/
│   ├── check-size.mjs               # out/ size budget
│   └── lighthouse.mjs               # serves out/ and audits every route
├── public/
│   ├── images/
│   │   ├── team/                    # member photos (WebP, 400×400)
│   │   ├── diagrams/                # architecture / methodology (SVG preferred)
│   │   └── og-cover.webp            # 1200×630 link-preview image
│   ├── logos/                       # sliit.svg + technology logos (SVG)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx               # fonts, metadata, <Navbar/>, <main>, <Footer/>
│   │   ├── globals.css              # Tailwind import + design tokens
│   │   ├── page.tsx                 # Home
│   │   ├── domain/page.tsx
│   │   ├── milestones/page.tsx
│   │   ├── documents/page.tsx
│   │   ├── presentations/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/   Navbar.tsx  NavDropdown.tsx  MobileMenu.tsx  Footer.tsx  BackToTop.tsx
│   │   ├── home/     Hero.tsx  LoopDiagram.tsx  ComponentCards.tsx  Highlights.tsx  NextMilestone.tsx
│   │   ├── domain/   SectionNav.tsx  LiteratureSurvey.tsx  GapTable.tsx  ResearchProblem.tsx
│   │   │             Objectives.tsx  MethodologyFlow.tsx  TechGrid.tsx
│   │   ├── milestones/ MilestoneTimeline.tsx  MilestoneItem.tsx  OpenFromHash.tsx
│   │   └── ui/       Button.tsx  Card.tsx  Badge.tsx  SectionHeading.tsx  PageHeader.tsx
│   │                 ExternalLink.tsx  StatusBadge.tsx  Container.tsx
│   ├── data/                        # ALL content lives here — components never hard-code content
│   │   ├── site.ts                  # project name, group, abstract, supervisors, links
│   │   ├── nav.ts                   # navigation tree
│   │   ├── components.ts            # the 4 research components
│   │   ├── domain.ts                # literature, gap, problem, objectives, methodology, tech
│   │   ├── team.ts
│   │   ├── milestones.ts
│   │   ├── documents.ts
│   │   └── presentations.ts
│   ├── lib/
│   │   ├── asset.ts                 # prefixes NEXT_PUBLIC_BASE_PATH to public/ paths
│   │   └── cn.ts                    # clsx wrapper
│   └── types/
│       └── content.ts               # shared TypeScript types (§10)
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 7. Site map and navigation (one-page site, decided Oct 2026)

All seven required sections live on the **home page** as anchored sections; the tabs jump to them.
Section ids: `top` (hero, stats, loop, components) · `literature-survey` · `research-gap` ·
`research-problem` · `research-objectives` · `methodology` · `technologies` · `milestones`
(each milestone `<details id="<milestone id>">`) · `documents` · `presentations` · `about` · `contact`.

| Nav item | Href | Dropdown |
|---|---|---|
| Home | `/#top` | — |
| Domain ▾ | `/#literature-survey` | the six Domain anchors |
| Milestones ▾ | `/#milestones` | one entry per milestone → `/#<id>` (`OpenFromHash` opens it) |
| Documents / Presentations / About Us / Contact Us | `/#documents` … | — |

Navigation rules: identical sticky translucent navbar; **scroll-spy** highlights the tab of the section in
view (`data-nav-section` + `sectionToNav` in `src/data/nav.ts`); logo returns to `#top`; dropdowns open on
hover and click, close on Esc / outside click; mobile hamburger panel is portalled to `body` (the header's
backdrop blur would otherwise clip it); footer lists all sections; back-to-top after scrolling.
Separate routes were removed; `not-found.tsx` remains.

## 8. Design system

**Mood (updated Oct 2026, modelled on vesant.ai):** white, clean, product-grade. Light canvas with navy
ink and one cyan accent; selected sections flip to dark navy with the `.dark-section` class
(same token names, inverted) for contrast and rhythm: hero (light, wavy cursor field) → stats strip
(navy) → loop (white) → components "lifecycle" rows (navy) → next milestone (soft).

### Colour tokens (`globals.css`, Tailwind v4)

```css
@theme {
  --color-canvas:    #ffffff;  /* page background */
  --color-surface:   #f5f9fd;  /* soft panels, hero */
  --color-surface-2: #eaf2fa;  /* hover / raised */
  --color-line:      #c9dcec;  /* borders, dividers */
  --color-ink:       #0e182a;  /* headings, main text (navy) */
  --color-muted:     #4a5a72;  /* secondary text */
  --color-brand:     #00c2ff;  /* cyan accent: primary buttons, highlights (navy text on it: 8.4:1) */
  --color-brand-ink: #0e182a;  /* text on cyan */
  --color-navy:      #0e182a;  /* dark sections, navbar CTA */
  --color-navy-2:    #152238;  /* dark section cards */
  --color-on-navy-muted: #a9b6c9;
  --color-pass: #16a34a;  --color-warn: #d97706;    /* status only */
  --color-c1: #7c5cff;  --color-c2: #00c2ff;  --color-c3: #f0569a;  --color-c4: #14b8a6;
  --font-sans: var(--font-inter-tight);    /* headings + body, tracking -0.035em on h1 */
  --font-logo: var(--font-space-grotesk);  /* wordmark only */
  --font-mono: var(--font-geist-mono);     /* badges, dates, ids */
}
```

Rules: one accent (`brand`) per screen; green/amber only carry status meaning;
component colours appear only where a component is identified (loop diagram, stage rows, badges).
Buttons: primary = cyan pill with navy text; secondary = navy outline; `navy` = filled navy (navbar CTA).
Logo: `<Logo/>` = QA mark (`public/logos/qa-mark.webp`, trimmed from `qa-logo-freelogovectors.png`) + "NEXTGEN QA" wordmark in Space Grotesk. Favicons: `src/app/favicon.ico`, `icon.png`, `apple-icon.png` from the same mark.

### Hero (implemented)
Badge pill → h1 (56–64 px, −0.035em) → abstract (18 px, max 640 px) → two pills → group line →
full-width browser-frame mockup (`HeroMockup`, 16/8.2, max 860 px) with the dashboard video slot.
Background: the React Bits **Waves** component (`src/components/Waves.jsx` + `Waves.css`), added with
`pnpm dlx shadcn@latest add @react-bits/Waves-JS-CSS` (registry copy, no npm dependency; `components.json`
exists only for that CLI). Under it a gradient fades to the section colour (0.2 → 0.75 at 70% → 1).
Props used in `Hero.tsx`: lineColor, waveSpeedX/Y, waveAmpX/Y, xGap, yGap, friction, tension, maxCursorMove.
Layout: `Container` caps at 1720 px (`narrow` = 1152 px for text pages); hero text column 840 px.
Reveal: transform-only slide on h1/abstract (LCP-safe), fade on badge/buttons; mockup drifts up with
`animation-timeline: view()` where supported.

**Hero video:** add `public/video/dashboard.mp4` manually (git-ignored; 720p, short loop, < 6 MB so the
upload stays under 20 MB) and set `site.heroVideo.enabled = true`. It renders `<video autoplay muted loop
playsinline preload="metadata">`. Until then a CSS placeholder of the dashboard chrome is shown.

### Typography
- `h1` 48–60 px (mobile 36 px), bold, tight tracking · `h2` 30–36 px · `h3` 20–24 px · body 16–18 px, line-height 1.7.
- Max text width ~70 characters (`max-w-prose`). Short paragraphs.
- Mono font for group ID, dates, marks and status badges.

### Layout and components
- Container `max-w-6xl mx-auto px-5 md:px-8`; sections `py-20 md:py-28`.
- Cards: `bg-surface border border-line rounded-2xl p-6`, hover → `bg-surface-2` + 1 px brand border.
- Buttons: primary (brand fill), secondary (outline). Rounded-full, 44 px min height.
- Subtle background: one soft radial brand glow behind the hero (CSS gradient, no image).
- Focus ring: `outline-2 outline-offset-2 outline-brand` on all interactive elements.

### Motion
- Only CSS transitions (150–250 ms) on hover/focus and a gentle fade-up for hero content.
- Wrap all motion in `@media (prefers-reduced-motion: no-preference)`.

---

## 9. Page specifications

### 9.1 Home (`/`)
Purpose: an attractive, concise introduction (guideline: "very attractive", do not overuse images).
Sections in order:
1. **Hero** — group badge `R26-SE-039`, `<h1>` "NextGen QA", subtitle
   "An AI-Powered Closed-Loop QA Automation Platform", 2–3 sentence abstract from `site.ts`,
   buttons: "Explore the research" → `/domain/`, "View documents" → `/documents/`.
2. **LoopDiagram** — inline, responsive SVG of the closed loop:
   Meeting speech → User stories (C1) → Gherkin & test code (C2) → Execution (C2) →
   Failure analysis & self-healing (C3) → Traceability & quality prediction (C4) → back to the start.
   Nodes coloured with `--color-c1..c4`; `<title>`/`<desc>` for screen readers; stacks vertically on mobile.
3. **ComponentCards** — 4 cards from `components.ts`: number, title, member name, one-line summary,
   coloured top border, link to `/domain/#research-objectives`.
4. **Highlights** — 3–4 key facts from `site.ts` (e.g. "4 integrated components",
   "Deployed on AWS"); no invented statistics.
5. **NextMilestone** — banner showing the first milestone with status `upcoming`
   (computed from `milestones.ts`), linking to it.

### 9.2 Domain (`/domain/`)
One page, six anchored sections; desktop shows a **sticky left SectionNav with scroll-spy**,
mobile shows horizontally scrollable chips at the top.
- `#literature-survey` — themes as cards (theme title, 2–3 sentence summary, key references).
- `#research-gap` — `GapTable`: rows = capabilities, columns = existing approaches + NextGen QA,
  cells use ✓ / ✗ / Partial badges (accessible text, not colour only).
- `#research-problem` — the main research problem as a large callout quote, then the
  sub-problems / research questions per component.
- `#research-objectives` — main objective, then 4 component objective cards (colour-coded).
- `#methodology` — `MethodologyFlow` SVG (Design Science Research steps) + numbered steps.
- `#technologies` — `TechGrid` grouped by category (Frontend, Backend, AI/ML, Testing, DevOps & Cloud),
  each with an SVG logo + name.

### 9.3 Milestones (`/milestones/`)
Guideline: include details, date and marks for each assessment; use a drop-down for the user to choose.
- Vertical timeline; each milestone is a `<details>` item (`MilestoneItem`) with
  title, date, marks, `StatusBadge` (completed / upcoming), details list and related links
  (document, slides).
- Navbar dropdown links to `/milestones/#<id>`; `OpenFromHash` (client) opens and scrolls to that item.

### 9.4 Documents (`/documents/`)
Guideline: list produced and pending documents (links only).
- Grouped sections: Project Charter · Proposal Documents · Checklist Documents · Final Documents
  (group report + 4 individual theses).
- Each `DocumentCard`: title, owner (group or member), format badge, status badge.
  `available` → "Open" button (external link, new tab). `pending` → disabled "Coming soon".

### 9.5 Presentations (`/presentations/`)
- Cards for Proposal, Progress Presentation 1, Progress Presentation 2, Final Presentation.
- Each: date, optional thumbnail (WebP), "View slides" external link, or a "Coming soon" state
  for future presentations (keep provision for new entries via data only).

### 9.6 About Us (`/about/`)
- Short group introduction.
- Team grid (4 members): photo, name, student ID, component (colour-coded), email (`mailto:`),
  optional GitHub/LinkedIn, achievements list.
- Supervisors section: supervisor and co-supervisor.

### 9.7 Contact Us (`/contact/`)
- Contact cards: group email(s), member emails, phone numbers, institution address.
- **Email template:** a "Write to us" button using `mailto:` with a pre-filled subject and body
  (from `site.ts`), plus the same template shown in a styled block with a "Copy" button (client).
- No backend form.

### 9.8 Not found (`not-found.tsx`)
Friendly message + button back to Home.

### 9.9 Metadata
Each page exports `metadata` (title template `"%s · NextGen QA"`, description).
Root layout sets Open Graph image `og-cover.webp`, theme colour `#0b1220`, favicon.

---

## 10. Data model (`src/types/content.ts`)

```ts
export type ComponentNo = 1 | 2 | 3 | 4;
export type Status = "completed" | "upcoming";
export type DocStatus = "available" | "pending";

export interface ResearchComponent {
  no: ComponentNo;
  title: string;
  member: string;
  summary: string;        // one line
  objective: string;      // used on Domain
}

export interface Member {
  name: string;
  studentId: string;
  component: ComponentNo;
  email: string;
  photo: string;          // path under public/, used through asset()
  phone?: string;
  github?: string;
  linkedin?: string;
  achievements?: string[];
}

export interface Milestone {
  id: string;             // used as anchor: proposal, pp1, pp2, final, viva
  title: string;
  date: string;           // ISO "2026-03-15" or "TBA"
  marks: string;          // e.g. "6%" or "TBA"
  status: Status;
  summary: string;
  details: string[];
  links?: { label: string; href: string }[];
}

export interface DocumentItem {
  id: string;
  title: string;
  category: "charter" | "proposal" | "checklist" | "final";
  owner: string;          // "Group" or member name
  format: "PDF" | "DOCX" | "Link";
  status: DocStatus;
  href?: string;          // required when available
  description?: string;
}

export interface Presentation {
  id: string;
  title: string;
  date: string;
  status: Status;
  slidesHref?: string;
  thumbnail?: string;
}
```

---

## 11. Coding conventions

- Server Components by default; client components small, in their own file, `"use client"` at the top.
- **No content strings inside components** — import from `src/data/*` (UI labels like "Open" are fine).
- Public files only via `asset()`:

```ts
  // src/lib/asset.ts
  export const asset = (path: string) =>
    `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path.startsWith("/") ? path : `/${path}`}`;
```

- Internal navigation with `next/link` (it adds `basePath` automatically).
- External links through `<ExternalLink>`: `target="_blank" rel="noopener noreferrer"` + an icon.
- Unknown content stays as a visible `TODO:` string in the data files — never invent names,
  dates, marks or results.
- No `any`. Components in PascalCase files; one component per file.
- Mobile-first responsive classes; test at 360 px, 768 px, 1280 px.

---

## 11a. Performance lessons already learned (do not regress)

- Never server-render `open` on a `<details>`: Lighthouse's Chrome raised React hydration error #418,
  the whole tree re-rendered on the client, TBT doubled and sub-pages dropped to 81–85.
- Do not animate the hero `<h1>` or abstract paragraph: they are the LCP element; a fade-up adds
  its full duration to LCP. Animate only the badge, buttons and footnote.
- Normalise `usePathname()` for trailing slashes before computing the active nav item.
- White text on `#3b82f6` is 3.67:1 (fails AA). Filled buttons use `brand-strong` (#2563eb).
- `public/robots.txt` must exist or the SEO category caps at 91.
- Next 16 export writes segment prefetch payloads as `__next.<seg>/__PAGE__.txt` but the client
  requests `__next.<seg>.__PAGE__.txt`; `scripts/postbuild.mjs` mirrors them. Keep it in `pnpm build`.
- The audit script serves `out/` without SPA fallback so 404s and robots.txt behave like the course web.

## 12. Content — known facts (seed `src/data/`)

**site.ts**
- Short name: NextGen QA · Full title: *NextGen QA — An AI-Powered Closed-Loop QA Automation Platform*
- Group ID: R26-SE-039 · Year: 2026
- Institution: Sri Lanka Institute of Information Technology (SLIIT), Faculty of Computing
- Department: Department of Software Engineering ·
  Degree: B.Sc. (Hons) in Information Technology, specialising in Software Engineering
- Supervisor: Ms. Suriyaa Kumari · Co-supervisor: Mr. Eishan Weerasinghe
- Abstract (DRAFT — team to confirm): "Agile teams capture requirements in sprint conversations faster
  than QA engineers can turn them into automated tests. NextGen QA closes this gap as one AI-powered loop:
  it converts meeting speech into user stories, generates and independently validates executable UI tests
  grounded in the live application, analyses and self-heals failing tests, and maintains a live requirements
  traceability matrix with quality prediction."
- Email template subject: "Inquiry about NextGen QA (R26-SE-039)"
- Public API docs (Component 2): https://nextgenqasliit.duckdns.org/testcase-docs/docs

**components.ts**

| No | Title | Member | Summary |
|---|---|---|---|
| 1 | Meeting-to-Story Conversion | TODO | Converts meeting speech into structured user stories. |
| 2 | Intelligent Test Case Generation | Abeygunasekara D.T. (IT22303684) | Generates Gherkin and executable Playwright, Selenium and Cypress suites grounded in the live UI, with independent validation. |
| 3 | Failure Analysis and Self-Healing | TODO | Classifies test failures and repairs broken locators. |
| 4 | Traceability and Quality Prediction | TODO | Maintains a live requirements traceability matrix and predicts quality. |

**domain.ts — Component 2 content available now (other components: TODO)**
- Literature themes: requirements-to-test and BDD generation; LLM-based test code generation;
  GUI and web agents (Set-of-Mark, multi-role reasoning, reflexion); test prioritisation and risk
  prediction (APFD); validation of LLM output (static checks, LLM-as-a-judge).
- Gaps: generation without grounding · exploration without a stopping rule ·
  validation absent or self-referential · no measurement loop.
- Research problem (C2): "How can executable UI test suites be generated automatically from Agile user
  stories such that they are grounded in the real application, discoverable beyond what the stories
  state, and independently validated before execution, within a closed CI/CD loop?"
- Main research problem of the whole project: TODO (team to provide).
- Methodology: Design Science Research — problem identification → objectives → design and
  development → demonstration (SauceDemo) → evaluation → communication.
- Technologies (C2; team adds others): React, FastAPI (Python), PostgreSQL (Neon), Playwright,
  Selenium, Cypress, scikit-learn, OpenAI / Anthropic / Gemini / Ollama LLM providers, Docker, Caddy,
  AWS EC2, GitHub Actions.

**milestones.ts** — ids `proposal`, `pp1`, `pp2`, `final`, `viva`; titles
Project Proposal, Progress Presentation 1, Progress Presentation 2, Final Assessment, Viva.
Dates and marks: `TODO`. Status: proposal, pp1, pp2 = completed; final, viva = upcoming (team to confirm).

**documents.ts** — Project Charter (Group) · Proposal Document (Group) · Checklist documents ·
Final documents: Group report + 4 individual theses. All `pending` with `href` TODO until links are provided.

**presentations.ts** — Proposal, Progress Presentation 1, Progress Presentation 2, Final Presentation;
`slidesHref` TODO.

**team.ts** — Abeygunasekara D.T., IT22303684, Component 2; other three members TODO.
Photos: `/images/team/<studentId>.webp`.

---

## 13. Build plan (do in order; run `pnpm build` after each phase and fix errors before continuing)

- [x] **Phase 1 — Scaffold:** config (§5), tokens and fonts (§8), `asset()`, `cn()`, types (§10),
      `layout.tsx` with Navbar, MobileMenu, NavDropdown, Footer, BackToTop.
- [x] **Phase 2 — Data:** create all `src/data/*` files with the content in §12 and `TODO` placeholders.
- [x] **Phase 3 — UI kit:** Container, PageHeader, SectionHeading, Card, Button, Badge, StatusBadge, ExternalLink.
- [x] **Phase 4 — Home** (§9.1) including the LoopDiagram SVG. *(first version; refine with §15)*
- [ ] **Phase 5 — Domain** (§9.2) with SectionNav scroll-spy, GapTable, MethodologyFlow, TechGrid.
- [ ] **Phase 6 — Milestones, Documents, Presentations** (§9.3–9.5) including OpenFromHash.
- [ ] **Phase 7 — About, Contact, Not found** (§9.6–9.8) including the mailto template and Copy button.
- [ ] **Phase 8 — Polish:** metadata and OG image, favicon, keyboard and screen-reader pass,
      reduced-motion check, responsive check at 360/768/1280 px.
- [ ] **Phase 9 — Verify:** `pnpm check` clean, `pnpm preview` works, all routes and anchors work,
      build with `NEXT_PUBLIC_BASE_PATH=/test` still loads images and links, `pnpm size` < 5 MB.
- [ ] **Phase 10 — Showcase (§15):** demo video facade, animated loop, live-system links.

---

## 14. Definition of done

- All 7 required sections exist and match `docs/website-guidelines.md`.
- Consistent navbar and footer on every page; active page highlighted; dropdowns keyboard-accessible.
- Milestones show details, date and marks, selectable from a drop-down.
- Documents and slides are external links; pending items clearly marked.
- No server features; `out/` is pure static files; total size < 5 MB.
- Lighthouse (mobile) targets: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
  (enforced by `pnpm perf`).
- No invented facts: every unknown value is a visible `TODO` in `src/data/`.

---

## 15. Viva-panel showcase plan (added; implement after Phase 7, each item must keep `pnpm check` green)

The panel should feel the product within 30 seconds of landing on Home, without the page getting heavy.

1. **Demo video, hosted externally.** Upload a 60–90 s screen recording of the dashboard
   (story → Gherkin → validation → code → execution) to YouTube (unlisted) or Google Drive.
   On the site, show a `VideoFacade` client component: a 1280×720 WebP poster (≤ 80 KB) with a
   play button; the `<iframe>` is injected only on click (`youtube-nocookie.com`, `loading="lazy"`).
   Zero video bytes in the repo; zero third-party JS until the user clicks.
2. **Animated closed loop.** Animate the `LoopDiagram` with CSS only: a dash travelling around the
   loop path and nodes lighting up in sequence (`stroke-dashoffset` keyframes). Disabled under
   `prefers-reduced-motion`.
3. **"See it live" strip.** Links to the public Swagger (`/testcase-docs/docs`) and the status page,
   with a short caption. External links only; no fetches from the site.
4. **Pipeline walkthrough.** A six-step horizontal stepper on Home (Story → Gherkin → DOM → Code →
   Validate → Run) with one real screenshot per step as a small WebP (≤ 40 KB each) inside a
   `<details>`-free tab strip; images lazy-loaded.
5. **Evidence tiles.** Measured numbers only, sourced from the evaluation scripts and labelled
   "measured": pass rate over N scenario runs, number of CI executions, number of automated tests
   gating deployment. Never show synthetic-data accuracy as a headline.
6. **Validation gate explainer.** A compact three-column diagram (static checks → independent judge →
   auto-fix) because it answers the panel's question "how do you know the generated tests are right?".
