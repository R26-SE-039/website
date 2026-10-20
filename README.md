# NextGen QA — Research Project Website (R26-SE-039)

**Live site:** https://nextgenqa.vercel.app/

The website for **NextGen QA — An AI-Powered Closed-Loop QA Automation Platform**, a final-year research
project at the Sri Lanka Institute of Information Technology (SLIIT), Faculty of Computing, Department of
Software Engineering (2026).

NextGen QA turns sprint meeting speech into user stories, generates and independently validates
executable UI tests, heals the tests that break, and traces every requirement to its result.

---

## Team

| Component | Title | Member |
|---|---|---|
| C1 | Meeting-to-Story Conversion | Jinad Induvidwa A.G. (IT22251114) |
| C2 | Intelligent Test Case Generation | Abeygunasekara D.T. (IT22303684) — **Group Leader** |
| C3 | Failure Analysis and Self-Healing | Ranasinghe S.I. (IT22371768) |
| C4 | Traceability and Quality Prediction | Rashani K.G.M. (IT22182678) |

**Supervisor:** Ms. Suriyaa Kumari · **Co-Supervisor:** Mr. Eishan Weerasinghe

---

## What the site contains

The site is a single page. The navigation bar jumps to each section, as the course guidelines require:

| Tab | Content |
|---|---|
| **Home** | Abstract, dashboard video, key results, the four components |
| **Domain** | Literature survey, research gap, research problem and questions, objectives, methodology, technologies |
| **Milestones** | Every assessment with its date, marks and status (pick one from the drop-down or the stepper) |
| **Documents** | Project Charter (TAF), Proposal, Checklist, Final Report and the four individual theses |
| **Presentations** | Slides for the Proposal, Progress Presentation 1 and 2, and the Final Presentation |
| **About us** | Supervisors and team members with photos, e-mails and links |
| **Contact us** | E-mail addresses and a ready-made e-mail template |

Documents and slides that are already published download straight from the site. Pending ones are
listed and switch on when their link is added.

---

## Built with

- **Next.js 16** (App Router, static export), **React 19**, **TypeScript**
- **Tailwind CSS v4**, **lucide-react** icons
- Self-hosted fonts (Inter Tight, Space Grotesk); no external requests at page load
- Static HTML, CSS and a small amount of JavaScript. No server or database is needed.

Size: the total upload is about **11 MB**, under the course limit of **20 MB**. Most of that is the
slide PDFs; the site itself is about 3 MB.

---

## Running it locally

Requires **Node.js 20+** and **pnpm** (`npm install -g pnpm`).

```bash
pnpm install
pnpm dev        # development server on http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm build` | Static export to `out/` |
| `pnpm preview` | Serves `out/` on http://localhost:3005 to check the real build |
| `pnpm size` | Checks the size budget (5 MB team target, 20 MB course limit) |
| `pnpm perf` | Lighthouse mobile audit of every page (target ≥ 95 in every category) |
| `pnpm check` | Build + size + Lighthouse; run before every commit |
| `pnpm lint` / `pnpm typecheck` | ESLint and TypeScript checks |

> The built site in `out/` must be served from a web address. Opening `out/index.html` by double-clicking
> it does not load the styles.

---

## Deployment

**Vercel (live site).** Every push to `main` on
[github.com/R26-SE-039/website](https://github.com/R26-SE-039/website) is built and published to
https://nextgenqa.vercel.app/ automatically.

**Course web (SLIIT upload).**

1. Run `pnpm build`.
2. Upload the **contents** of `out/` (not the folder itself) so that `index.html` is at the top level.
3. If the course web puts the site in a sub-folder (for example `https://…/R26-SE-039/`), build with
   that folder as the base path first:

   ```bash
   NEXT_PUBLIC_BASE_PATH=/R26-SE-039 pnpm build
   ```

**Contact form (EmailJS).** The site is static, so the form sends through
[EmailJS](https://www.emailjs.com) from the browser (free plan: 200 emails/month). Until it is
configured, the Send button falls back to the pre-filled `mailto:` link.

1. Create an EmailJS account, add an **Email Service** (the team Gmail) and note its Service ID.
2. Create an **Email Template** with these variables and note its Template ID:
   `{{from_name}}`, `{{reply_to}}`, `{{organization}}`, `{{subject}}`, `{{message}}`.
   Set the template's *Reply To* field to `{{reply_to}}` so replies go to the sender.
3. Copy the **Public Key** from Account → API keys.
4. Put the three values in `.env.local` (see `.env.example`) and in the Vercel project's
   environment variables, then redeploy.

---

## Updating the content

All text, links and dates live in `src/data/`. No component code needs to change.

| To change… | Edit |
|---|---|
| Title, abstract, contact e-mail, hero video | `src/data/site.ts` |
| Team members, photos, group leader | `src/data/team.ts` (photos: `public/images/team/<studentId>.webp`, square, 400 px) |
| Milestone dates, marks and status | `src/data/milestones.ts` |
| Documents | `src/data/documents.ts` |
| Presentation slides and dates | `src/data/presentations.ts` |
| Literature, research gap, objectives, technologies | `src/data/domain.ts` |

**Publishing a document or slide deck:**

- **Small PDF (up to a few MB):** compress it, put it in `public/docs/` with a name without spaces, then
  set `status: "available"` and `href: "/docs/<file>.pdf"` (or `slidesHref` for presentations).
- **Large PDF:** upload it to Google Drive and share it as *Anyone with the link → Viewer*, then paste
  the share link as `href`. This keeps the site under the 20 MB limit.

Search for `TODO` in `src/data/` to find content that still needs the team's final values.

---

## Project structure

```
src/
  app/            page layout, metadata, favicons
  components/
    home/         one component per section (Hero, LiteratureSurvey, MilestonesSection, …)
    layout/       Navbar, Footer, Logo
    ui/           shared pieces (Container, SectionIntro, StatusBadge, BrandSprite, …)
  data/           all site content
public/
  docs/           published PDFs (compressed)
  images/         team photos, diagrams, video poster
  logos/          QA logo mark
  video/          hero dashboard recording
scripts/          size check, Lighthouse audit, post-build step
docs/             course website guidelines
```

`CLAUDE.md` is the full build brief: design rules, performance lessons and the build plan.

---

© 2026 NextGen QA (R26-SE-039), Sri Lanka Institute of Information Technology.
