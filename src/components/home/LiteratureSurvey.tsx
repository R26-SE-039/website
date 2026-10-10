import type { CSSProperties } from "react";
import {
  ArrowRight,
  BookOpen,
  Gauge,
  GitPullRequest,
  RotateCcw,
  ScanEye,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { cn } from "@/lib/cn";
import { literature, literatureInsight } from "@/data/domain";

const icons: Record<string, LucideIcon> = {
  requirements: Workflow,
  "llm-testgen": Sparkles,
  agents: ScanEye,
  repair: GitPullRequest,
  quality: Gauge,
};

/*
  Hub layout from lg up: the gap summary sits in the middle column (spanning two
  rows) and the five threads surround it (left, right, left, right, and a
  full-width horizontal card below), each with a short connector towards the hub. Below lg it collapses to the hub card
  followed by a one- or two-column stack.
*/
const placement = [
  { cell: "lg:col-start-1 lg:row-start-1", side: "right" },
  { cell: "lg:col-start-3 lg:row-start-1", side: "left" },
  { cell: "lg:col-start-1 lg:row-start-2", side: "right" },
  { cell: "lg:col-start-3 lg:row-start-2", side: "left" },
  { cell: "sm:col-span-2 lg:col-span-3 lg:col-start-1 lg:row-start-3", side: "top", wide: true },
] as const;

const connector = {
  right: "top-1/2 -right-6 h-px w-6",
  left: "top-1/2 -left-6 h-px w-6",
  top: "-top-6 left-1/2 h-6 w-px",
} as const;

export default function LiteratureSurvey() {
  return (
    <section id="literature-survey" data-nav-section className="bg-white py-24 md:py-32">
      <Container>
        <div className="scroll-reveal">
          <SectionIntro
            eyebrow="Domain · Literature survey"
            title="What the research already knows, and where it stops."
            description="Five threads of recent work meet in this project. Each one solves a slice; the survey shows why the slices never joined up."
          />
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {/* Hub */}
          <div className="scroll-reveal relative overflow-hidden rounded-[24px] bg-navy p-7 text-white sm:col-span-2 md:p-9 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:flex-col">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full border border-white/10"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-10 size-44 rounded-full border border-brand/25"
            />
            <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-brand/15 text-brand">
              <BookOpen size={22} />
            </span>
            <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand">The gap</p>
            <p className="mt-3 text-2xl font-bold leading-snug md:text-[1.75rem]">{literatureInsight.headline}</p>
            <p className="mt-4 text-base leading-relaxed text-on-navy-muted">{literatureInsight.text}</p>

            <div className="relative mt-8 lg:mt-auto lg:pt-8">
              <p className="text-sm font-semibold text-white">NextGen QA joins them into one workflow</p>
              <ol className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2" aria-label="Integrated workflow">
                {literatureInsight.loop.map((step, i) => (
                  <li key={step} className="flex items-center gap-1.5">
                    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/90">
                      {step}
                    </span>
                    {i < literatureInsight.loop.length - 1 ? (
                      <ArrowRight size={12} aria-hidden="true" className="text-brand" />
                    ) : (
                      <RotateCcw size={12} aria-label="back to the start" className="text-brand" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Threads around the hub */}
          {literature.map((theme, i) => {
            const Icon = icons[theme.id] ?? BookOpen;
            const place = placement[i] ?? placement[0];
            const wide = "wide" in place && place.wide;
            return (
              <article
                key={theme.id}
                style={{ "--d": i + 1 } as CSSProperties}
                className={cn(
                  "scroll-reveal group relative flex flex-col rounded-[24px] border border-line bg-white p-6 hover:border-brand/70 hover:shadow-[0_22px_48px_-28px_rgba(14,24,42,0.4)] md:p-7 motion-safe:transition-[translate,box-shadow,border-color] motion-safe:duration-300 lg:motion-safe:hover:-translate-y-1.5",
                  wide && "lg:grid lg:grid-cols-12 lg:gap-x-10 lg:p-8",
                  place.cell,
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute hidden bg-line motion-safe:transition-colors group-hover:bg-brand lg:block",
                    connector[place.side],
                  )}
                />
                <div className={cn(wide && "lg:col-span-5")}>
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface text-ink motion-safe:transition-colors motion-safe:duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-ink">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="flex items-center gap-2">
                      {theme.components.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-navy px-2.5 py-0.5 font-mono text-[11px] font-semibold text-white"
                          title={`Answered by Component ${c}`}
                        >
                          C{c}
                        </span>
                      ))}
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{theme.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{theme.summary}</p>
                </div>

                <div className={cn("mt-5 flex flex-1 flex-col", wide && "lg:col-span-7 lg:mt-0")}>
                  <div className={cn("rounded-r-2xl border-l-2 border-brand bg-surface px-4 py-3.5", !wide && "flex-1")}>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                      Where it stops
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{theme.gap}</p>
                  </div>

                  {theme.references.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Key references">
                      {theme.references.map((r) => (
                        <li
                          key={r}
                          className="rounded-full border border-line bg-white px-2.5 py-1 font-mono text-[11px] text-muted"
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
