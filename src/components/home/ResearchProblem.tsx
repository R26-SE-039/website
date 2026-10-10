import {
  BadgeCheck,
  Check,
  FileX,
  Filter,
  MessagesSquare,
  Play,
  ShieldAlert,
  ShieldCheck,
  Unlink,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import {
  designPrinciples,
  problemNarrative,
  problemPoints,
  researchProblem,
  solutionNarrative,
} from "@/data/domain";

const problemIcons: LucideIcon[] = [MessagesSquare, FileX, ShieldAlert, Unlink];
const principleIcons: LucideIcon[] = [Filter, BadgeCheck, ShieldCheck, Play];

// Shared hover: only the icon reacts (same motion as the research-gap cards).
const iconMotion =
  "motion-safe:transition-[background-color,color,rotate,scale] motion-safe:duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6";

/** Problem → solution → research questions, all from the research paper (§I, §IV, §V). */
export default function ResearchProblem() {
  return (
    <section id="research-problem" data-nav-section className="bg-white py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow="Domain · Research problem & solution"
          title="The problem we set out to solve, and the loop that solves it."
        />

        {/* Problem */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h3 className="text-xl font-bold text-ink">Proposed problem</h3>
            {problemNarrative.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 text-[17px] leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <figure className="mt-8 rounded-r-3xl border-l-4 border-brand bg-surface px-6 py-5">
              <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a8fbd]">
                Research problem
              </figcaption>
              <blockquote className="mt-2 text-lg font-semibold leading-snug text-ink">{researchProblem.main}</blockquote>
            </figure>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7" aria-label="Lifecycle problems">
            {problemPoints.map((pt, i) => {
              const Icon = problemIcons[i % problemIcons.length];
              return (
                <li
                  key={pt.title}
                  className="group flex flex-col rounded-3xl border border-line bg-surface p-6"
                >
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className={`grid size-11 place-items-center rounded-2xl bg-brand/15 text-ink group-hover:bg-navy group-hover:text-brand ${iconMotion}`}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full bg-navy px-2.5 py-0.5 font-mono text-[11px] font-semibold text-white">
                      C{pt.no}
                    </span>
                  </div>
                  <h4 className="mt-5 text-base font-bold leading-snug text-ink">{pt.title}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{pt.text}</p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Solution */}
        <div className="relative mt-20 overflow-hidden rounded-3xl bg-navy p-7 text-white md:p-12">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full border border-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full border border-brand/20"
          />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand">Proposed solution</p>
              <p className="mt-4 text-xl font-semibold leading-snug md:text-2xl">{solutionNarrative[0]}</p>
            </div>
            <div className="lg:col-span-5 lg:pt-9">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck size={16} aria-hidden="true" className="text-brand" /> Human governance
              </p>
              <p className="mt-2 text-base leading-relaxed text-on-navy-muted">{solutionNarrative[1]}</p>
            </div>
          </div>

          <ol className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Design principles">
            {designPrinciples.map((d, i) => {
              const Icon = principleIcons[i % principleIcons.length];
              return (
                <li
                  key={d.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className={`grid size-10 place-items-center rounded-xl bg-brand/15 text-brand group-hover:bg-brand group-hover:text-navy ${iconMotion}`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="font-mono text-xs text-on-navy-muted">C{d.no}</span>
                  </div>
                  <p className="mt-4 font-bold leading-snug text-white">{d.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-on-navy-muted">{d.text}</p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Research questions */}
        <div className="mt-20">
          <h3 className="text-xl font-bold text-ink">Research questions and results</h3>
          <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {researchProblem.perComponent.map((q, i) => (
              <li
                key={q.no}
                className="flex flex-col rounded-3xl border border-line bg-white p-6"
              >
                <p className="font-mono text-xs text-muted">
                  <span className="font-semibold text-ink">RQ{q.no}</span> · Component {q.no}
                </p>
                <p className="mt-3 text-[15px] font-medium leading-relaxed text-ink">{q.question}</p>
                <div className="mt-auto pt-6">
                  <div className="border-t border-line pt-4">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a8fbd]">
                      Result
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {q.result.split(" · ").map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-muted">
                          <Check size={14} aria-hidden="true" className="mt-1 shrink-0 text-brand" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
