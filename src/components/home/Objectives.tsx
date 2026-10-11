import { Code2, Mic, Network, Target, Wrench, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { cn } from "@/lib/cn";
import { researchComponents } from "@/data/components";
import { mainObjective } from "@/data/domain";
import { site } from "@/data/site";
import type { ComponentNo } from "@/types/content";
import TimelineProgress from "./TimelineProgress";

const icons: Record<ComponentNo, LucideIcon> = { 1: Mic, 2: Code2, 3: Wrench, 4: Network };

/*
  Main objective, then the four component objectives on an alternating timeline.
  TimelineProgress fills the centre line as you scroll, and each numbered dot
  lights up once the fill reaches it.
*/
export default function Objectives() {
  return (
    <section id="research-objectives" data-nav-section className="bg-surface py-20 md:py-24">
      <Container>
        <SectionIntro
          eyebrow="Domain · Research objectives"
          title="One main objective, four component objectives."
          align="center"
        />

        <div className="relative mx-auto mt-8 max-w-[800px] overflow-hidden rounded-3xl bg-navy px-6 py-7 text-center md:px-10 md:py-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 size-64 rounded-full border border-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-20 size-52 rounded-full border border-brand/20"
          />
          <span
            aria-hidden="true"
            className="relative mx-auto grid size-10 place-items-center rounded-xl bg-brand/15 text-brand"
          >
            <Target size={19} />
          </span>
          <p className="relative mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            Main objective
          </p>
          <p className="relative mt-2 text-base font-medium leading-relaxed text-white md:text-[17px]">{mainObjective}</p>
        </div>

        <ol className="relative mx-auto mt-12 max-w-5xl space-y-6 md:space-y-0">
          <TimelineProgress />

          {researchComponents.map((c, i) => {
            const right = i % 2 === 1;
            const Icon = icons[c.no];
            const result = site.highlights[i];
            return (
              <li key={c.no} data-timeline-item className="group/item relative md:grid md:grid-cols-2 md:gap-14 md:py-5">
                <span
                  aria-hidden="true"
                  data-timeline-dot
                  className="absolute top-6 left-5 z-10 grid size-10 -translate-x-1/2 place-items-center rounded-2xl border-2 border-line bg-white text-xs font-bold text-muted transition-[background-color,border-color,color,box-shadow] duration-300 data-[active=true]:border-brand data-[active=true]:bg-navy data-[active=true]:text-brand data-[active=true]:shadow-[0_0_0_6px_rgba(0,194,255,0.18)] md:top-10 md:left-1/2"
                >
                  0{c.no}
                </span>

                <article
                  className={cn(
                    "group ml-14 rounded-3xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-500 md:ml-0 md:p-6 group-data-[active=true]/item:border-brand group-data-[active=true]/item:shadow-[0_24px_56px_-28px_rgba(0,194,255,0.65)]",
                    right ? "md:col-start-2" : "md:col-start-1",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand/15 text-ink group-hover:bg-navy group-hover:text-brand group-data-[active=true]/item:bg-navy group-data-[active=true]/item:text-brand motion-safe:transition-[background-color,color,rotate,scale] motion-safe:duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6"
                    >
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full bg-navy px-2.5 py-0.5 text-[11px] font-semibold text-white">
                      Component {c.no}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold leading-snug text-ink">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">{c.member}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.objective}</p>

                  {result && (
                    <div className="mt-5 flex items-center gap-4 rounded-2xl bg-surface px-4 py-3 transition-colors duration-500 group-data-[active=true]/item:bg-brand/10">
                      <span className="shrink-0 text-xl font-bold tracking-tight text-ink">{result.value}</span>
                      <span className="text-sm leading-snug text-muted">{result.note}</span>
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
