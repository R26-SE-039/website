import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { researchComponents } from "@/data/components";
import type { ComponentNo } from "@/types/content";

const colors: Record<ComponentNo, string> = {
  1: "var(--color-c1)",
  2: "var(--color-c2)",
  3: "var(--color-c3)",
  4: "var(--color-c4)",
};

/** Dark "lifecycle" section: one row per component, first row lifted as a white card. */
export default function ComponentCards() {
  return (
    <section className="dark-section py-24 md:py-32">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-brand">Four components</p>
            <h2 className="mt-5 max-w-[620px] text-4xl font-bold leading-[1.05] text-white md:text-[3.25rem]">
              Protect every stage of the QA lifecycle.
            </h2>
          </div>
          <p className="max-w-[560px] text-lg leading-relaxed text-on-navy-muted md:col-span-5">
            From a spoken requirement to a traceable, self-healing test — each member owns one stage, and the
            signals flow across every decision.
          </p>
        </div>

        <ol className="mt-16 space-y-5">
          {researchComponents.map((c, i) => {
            const lifted = i === 0;
            return (
              <li
                key={c.no}
                className={
                  lifted
                    ? "light-card grid gap-4 rounded-sm px-7 py-9 md:grid-cols-12 md:items-center md:px-8"
                    : "grid gap-4 border-b border-navy-line px-7 py-9 md:grid-cols-12 md:items-center md:px-8"
                }
              >
                <p className="font-semibold md:col-span-2" style={{ color: colors[c.no] }}>
                  Stage 0{c.no}
                </p>
                <div className="md:col-span-5">
                  <h3 className={lifted ? "text-2xl font-bold text-ink" : "text-2xl font-bold text-white"}>{c.title}</h3>
                  <p className={lifted ? "mt-1 text-sm text-muted" : "mt-1 text-sm text-on-navy-muted"}>{c.member}</p>
                </div>
                <div className="md:col-span-5">
                  <p className={lifted ? "text-base leading-relaxed text-muted" : "text-base leading-relaxed text-on-navy-muted"}>
                    {c.summary}
                  </p>
                  <Link
                    href="/domain/#research-objectives"
                    className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold ${lifted ? "text-ink" : "text-brand"}`}
                  >
                    Objective <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
