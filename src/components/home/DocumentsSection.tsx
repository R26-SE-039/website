import { FileText } from "lucide-react";
import Container from "@/components/ui/Container";
import ExternalLink from "@/components/ui/ExternalLink";
import SectionIntro from "@/components/ui/SectionIntro";
import StatusBadge from "@/components/ui/StatusBadge";
import { documentCategories, documents } from "@/data/documents";

export default function DocumentsSection() {
  return (
    <section id="documents" data-nav-section className="dark-section py-24 md:py-32">
      <Container>
        <SectionIntro
          dark
          eyebrow="Downloads · Documents"
          title="Documents produced so far, and the ones still pending."
          description="Links only. Each item opens the document in a new tab once it is published."
        />
        <div className="mt-14 space-y-12">
          {documentCategories.map((cat) => {
            const items = documents.filter((d) => d.category === cat.id);
            if (items.length === 0) return null;
            return (
              <div key={cat.id}>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand">{cat.title}</p>
                <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((doc) => (
                    <li key={doc.id} className="flex flex-col rounded-[24px] border border-navy-line bg-navy-2 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white">
                          <FileText size={20} />
                        </span>
                        <StatusBadge status={doc.status} />
                      </div>
                      <h3 className="mt-4 text-lg font-bold leading-snug text-white">{doc.title}</h3>
                      <p className="mt-1 text-sm text-on-navy-muted">
                        {doc.owner} · {doc.format}
                      </p>
                      {doc.description && <p className="mt-3 text-sm leading-relaxed text-on-navy-muted">{doc.description}</p>}
                      <div className="mt-5 pt-2">
                        {doc.status === "available" && doc.href ? (
                          <ExternalLink href={doc.href} className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-ink no-underline hover:brightness-95">
                            Open
                          </ExternalLink>
                        ) : (
                          <span className="inline-flex rounded-full border border-navy-line px-5 py-2 text-sm font-semibold text-on-navy-muted">
                            Coming soon
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
