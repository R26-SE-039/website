import Container from "@/components/ui/Container";
import { site } from "@/data/site";

export default function Highlights() {
  return (
    <section className="border-t border-line bg-surface/30 py-16 md:py-20">
      <Container>
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.highlights.map((h) => (
            <div key={h.label} className="rounded-2xl border border-line bg-surface p-6">
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">{h.label}</dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-ink">{h.value}</dd>
              <dd className="mt-1 text-sm text-muted">{h.note}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
