import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { researchComponents } from "@/data/components";
import { mainObjective } from "@/data/domain";
import type { ComponentNo } from "@/types/content";

const colors: Record<ComponentNo, string> = {
  1: "var(--color-c1)",
  2: "var(--color-c2)",
  3: "var(--color-c3)",
  4: "var(--color-c4)",
};

/** Main objective, then the four component objectives on an alternating timeline. */
export default function Objectives() {
  return (
    <section id="research-objectives" data-nav-section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionIntro eyebrow="Domain · Research objectives" title="One main objective, four component objectives." align="center" />
        <p className="mx-auto mt-8 max-w-[840px] rounded-[24px] bg-white px-7 py-6 text-center text-lg font-medium leading-relaxed text-ink">
          {mainObjective}
        </p>

        <ol className="relative mt-16 space-y-10 md:space-y-0">
          {/* centre line */}
          <span aria-hidden="true" className="absolute left-5 top-0 h-full w-px bg-line md:left-1/2 md:-translate-x-1/2" />
          {researchComponents.map((c, i) => {
            const right = i % 2 === 1;
            return (
              <li key={c.no} className="relative md:grid md:grid-cols-2 md:gap-16 md:py-8">
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-1 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-2xl font-mono text-xs font-bold text-white md:left-1/2 md:top-10"
                  style={{ backgroundColor: colors[c.no] }}
                >
                  0{c.no}
                </span>
                <div className={`pl-14 md:pl-0 ${right ? "md:col-start-2 md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">Component {c.no} · {c.member}</p>
                  <h3 className="mt-2 text-2xl font-bold leading-snug text-ink">{c.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted">{c.objective}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
