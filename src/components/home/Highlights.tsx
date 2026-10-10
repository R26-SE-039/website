import Container from "@/components/ui/Container";
import { site } from "@/data/site";

/** Dark stats strip directly under the hero mockup (Vesant-style "Stats"). */
export default function Highlights() {
  return (
    <section className="dark-section border-t border-navy-line py-10 md:py-12">
      <Container>
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {site.highlights.map((h) => (
            <div key={h.label} className="border-l border-navy-line pl-5">
              <dd className="text-3xl font-bold tracking-tight text-white md:text-4xl">{h.value}</dd>
              <dt className="mt-1 text-sm font-semibold text-white/90">{h.label}</dt>
              <dd className="mt-1 text-sm text-on-navy-muted">{h.note}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
