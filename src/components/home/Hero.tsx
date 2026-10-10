import { ArrowRight, FileText } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--color-brand) 22%, transparent) 0%, transparent 70%)",
        }}
      />
      <Container className="py-20 md:py-32">
        <div className="max-w-3xl">
          <Badge className="fade-up border-brand/40 bg-brand/10 text-brand">{site.groupId}</Badge>
          {/* The heading and abstract are the largest paint; they must not be animated or LCP slips. */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink md:text-6xl">{site.shortName}</h1>
          <p className="mt-3 text-xl font-medium text-ink/90 md:text-2xl">{site.subtitle}</p>
          <p className="mt-6 max-w-prose text-base text-muted md:text-lg">{site.abstract}</p>
          <div className="fade-up fade-up-delay-1 mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/domain/">
              Explore the research <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/documents/" variant="secondary">
              <FileText size={16} aria-hidden="true" /> View documents
            </ButtonLink>
          </div>
          <p className="fade-up fade-up-delay-2 mt-8 text-sm text-muted">
            {site.institution} · {site.faculty} · {site.year}
          </p>
        </div>
      </Container>
    </section>
  );
}
