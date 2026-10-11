import Container from "@/components/ui/Container";
import { researchComponents } from "@/data/components";

/** Dark "lifecycle" section: one row per component; on hover a white fill sweeps across the row. */
export default function ComponentCards() {
  return (
    <section className="dark-section py-24 md:py-32">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">Four components</p>
            <h2 className="mt-5 max-w-[620px] text-4xl font-bold leading-[1.05] text-white md:text-[3.25rem]">
              Protect every stage of the QA lifecycle.
            </h2>
          </div>
          <p className="max-w-[560px] text-lg leading-relaxed text-on-navy-muted md:col-span-5">
            From a spoken requirement to a traceable, self-healing test — each member owns one stage, and the
            signals flow across every decision.
          </p>
        </div>

        {/* Mobile: horizontal snap carousel of cards. md+: rows that fill white from the left on hover. */}
        <ol
          className="-mx-5 mt-16 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:block md:space-y-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
          aria-label="Research components"
        >
          {researchComponents.map((c) => (
            <li
              key={c.no}
              className="group flex w-[85%] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-navy-line bg-navy-2 px-6 py-8 sm:w-[60%] md:grid md:w-auto md:grid-cols-12 md:items-center md:gap-4 md:rounded-sm md:border-x-0 md:border-t-0 md:bg-transparent md:px-8 md:py-9 relative overflow-hidden motion-safe:md:transition-shadow motion-safe:md:duration-500 md:hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]"
            >
              {/* white fill: sweeps in from the left on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 hidden origin-left scale-x-0 bg-white md:block motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out md:group-hover:scale-x-100"
              />
              <p className="relative font-semibold text-brand motion-safe:transition-colors motion-safe:duration-500 md:col-span-2 md:group-hover:text-navy">
                Stage 0{c.no}
              </p>
              <div className="relative md:col-span-5">
                <h3 className="text-2xl font-bold text-white motion-safe:transition-colors motion-safe:duration-500 md:group-hover:text-navy">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-on-navy-muted motion-safe:transition-colors motion-safe:duration-500 md:group-hover:text-[#4a5a72]">
                  {c.member}
                </p>
              </div>
              <div className="relative mt-auto md:col-span-5 md:mt-0">
                <p className="text-base leading-relaxed text-on-navy-muted motion-safe:transition-colors motion-safe:duration-500 md:group-hover:text-[#4a5a72]">
                  {c.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
