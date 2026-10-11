import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { methodology } from "@/data/domain";
import { asset } from "@/lib/asset";

const diagram = {
  src: "/images/diagrams/high-level-diagram.webp",
  width: 730,
  height: 1069,
};

/** Architecture figure beside the Design Science Research steps (from the paper, §III). */
export default function Methodology() {
  return (
    <section id="methodology" data-nav-section className="bg-white py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow="Domain · Methodology"
          title="Design Science Research, delivered as four services in one loop."
          description="The artefact is the platform itself, evaluated per component and end to end on labelled meetings, SauceDemo, 180 CI failure runs and real repositories."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Architecture figure */}
          <figure className="lg:col-span-5 lg:self-start lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl border border-line bg-surface p-3 md:p-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- static diagram, images are unoptimized in the export */}
              <img
                src={asset(diagram.src)}
                alt="High-level architecture of NextGen QA: the client layer feeds Component 1 (voice and NLP intelligence), which feeds Component 2 (test generation and execution); Component 3 (failure analysis and self-healing) and Component 4 (quality prediction and RTM generation) consume its results, and an integration and feedback loop returns fixes and improvements to the test scripts."
                width={diagram.width}
                height={diagram.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-2xl bg-white"
              />
            </div>
            <figcaption className="mt-3 text-xs text-muted">
              Figure 1. High-level architecture of NextGen QA: four components joined by one integration and feedback loop.
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <p className="text-[17px] leading-relaxed text-muted">
              The project follows <span className="font-semibold text-ink">{methodology.name}</span>: the platform is the
              artefact, and each step below produced evidence for the next.
            </p>

            {/* DSR steps on a connected rail */}
            <ol className="relative mt-8">
              <span aria-hidden="true" className="absolute top-4 bottom-4 left-4 w-px -translate-x-1/2 bg-line" />
              {methodology.steps.map((s, i) => (
                <li key={s.title} className="group relative flex gap-5 pb-6 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="relative grid size-8 shrink-0 place-items-center rounded-xl bg-brand/15 text-xs font-bold text-ink ring-4 ring-white group-hover:bg-navy group-hover:text-brand motion-safe:transition-[background-color,color,rotate,scale] motion-safe:duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6"
                  >
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="font-bold text-ink">{s.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
