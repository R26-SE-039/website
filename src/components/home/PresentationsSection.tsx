import { Presentation as PresentationIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import ExternalLink from "@/components/ui/ExternalLink";
import SectionIntro from "@/components/ui/SectionIntro";
import StatusBadge from "@/components/ui/StatusBadge";
import { presentations } from "@/data/presentations";

export default function PresentationsSection() {
  return (
    <section id="presentations" data-nav-section className="bg-white py-24 md:py-32">
      <Container>
        <SectionIntro eyebrow="Downloads · Presentations" title="Slides from every presentation so far." />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {presentations.map((p) => (
            <li key={p.id} className="flex flex-col rounded-[24px] border border-line bg-surface p-6 transition-colors hover:border-brand">
              <div className="flex items-start justify-between gap-3">
                <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-ink">
                  <PresentationIcon size={20} />
                </span>
                <StatusBadge status={p.status} />
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{p.title}</h3>
              <p className="mt-1 font-mono text-xs text-muted">{p.date}</p>
              <div className="mt-5 flex-1" />
              {p.slidesHref ? (
                <ExternalLink href={p.slidesHref} className="text-sm font-semibold text-ink">
                  View slides
                </ExternalLink>
              ) : (
                <span className="text-sm font-semibold text-muted">Coming soon</span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
