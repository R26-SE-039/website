import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { researchComponents } from "@/data/components";

/** Dark "lifecycle" section: one row per component; a row lifts into a white card on hover. */
export default function ComponentCards() {
  return (
    <section className="dark-section py-24 md:py-32">
      <Container>
        <div className="scroll-reveal grid gap-8 md:grid-cols-12 md:items-end">
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

        {/* Mobile: horizontal snap carousel of cards. md+: rows that lift into a white card on hover/focus. */}
        <ol
          className="-mx-5 mt-16 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:block md:space-y-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
          aria-label="Research components"
        >
          {researchComponents.map((c, i) => (
            <li
              key={c.no}
              style={{ "--d": i } as CSSProperties}
              className="scroll-reveal scroll-reveal-x group flex w-[85%] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-navy-line bg-navy-2 px-6 py-8 sm:w-[60%] md:grid md:w-auto md:grid-cols-12 md:items-center md:gap-4 md:rounded-sm md:border-x-0 md:border-t-0 md:bg-transparent md:px-8 md:py-9 motion-safe:md:transition-[background-color,box-shadow] motion-safe:md:duration-300 md:hover:bg-white md:hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] md:focus-within:bg-white"
            >
              <p className="font-semibold text-brand motion-safe:transition-colors md:col-span-2 md:group-hover:text-navy md:group-focus-within:text-navy">
                Stage 0{c.no}
              </p>
              <div className="md:col-span-5">
                <h3 className="text-2xl font-bold text-white motion-safe:transition-colors md:group-hover:text-navy md:group-focus-within:text-navy">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-on-navy-muted motion-safe:transition-colors md:group-hover:text-[#4a5a72] md:group-focus-within:text-[#4a5a72]">
                  {c.member}
                </p>
              </div>
              <div className="mt-auto md:col-span-5 md:mt-0">
                <p className="text-base leading-relaxed text-on-navy-muted motion-safe:transition-colors md:group-hover:text-[#4a5a72] md:group-focus-within:text-[#4a5a72]">
                  {c.summary}
                </p>
                <Link
                  href="/domain/#research-objectives"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand motion-safe:transition-colors md:group-hover:text-navy md:group-focus-within:text-navy"
                >
                  Objective
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="motion-safe:transition-transform motion-safe:duration-300 md:group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
