import { Download, FileText, Presentation as PresentationIcon, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { documents } from "@/data/documents";
import { presentations } from "@/data/presentations";
import type { DocumentItem } from "@/types/content";

type Row = { label: string; href?: string };
type Card = { id: string; title: string; when: string; rows: Row[] };

const placeholder = (v?: string) => !v || /^(TODO|TBA)\b/i.test(v.trim());

const docHref = (d: DocumentItem) => (d.status === "available" ? d.href : undefined);
const docWhen = (d: DocumentItem) =>
  !placeholder(d.date) ? `Submitted on ${d.date}` : d.status === "available" ? "Published" : "Not submitted yet";

// Group documents get one card each; the individual theses become extra rows on the Final Report card.
const theses = documents.filter((d) => d.id.startsWith("final-c"));
const docCards: Card[] = documents
  .filter((d) => !d.id.startsWith("final-c"))
  .map((d) => ({
    id: d.id,
    title: d.id === "final-group" ? "Final Report" : d.title,
    when: docWhen(d),
    rows: [
      { label: d.owner === "Group" ? "Group" : d.owner, href: docHref(d) },
      ...(d.id === "final-group" ? theses.map((t) => ({ label: t.owner, href: docHref(t) })) : []),
    ],
  }));

const slideCards: Card[] = presentations.map((p) => ({
  id: p.id,
  title: p.title,
  when: !placeholder(p.date)
    ? `${p.status === "completed" ? "Presented on" : "Scheduled for"} ${p.date}`
    : p.status === "completed"
      ? "Presented"
      : "Date to be confirmed",
  rows: [{ label: "Group", href: p.slidesHref }],
}));

function DownloadLink({ row, title }: { row: Row; title: string }) {
  if (row.href) {
    return (
      <a
        href={row.href}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-brand underline-offset-4 hover:underline"
      >
        <Download size={13} aria-hidden="true" />
        Download
        <span className="sr-only">
          {title} ({row.label})
        </span>
      </a>
    );
  }
  return (
    <span aria-disabled="true" title="Not published yet" className="inline-flex shrink-0 cursor-not-allowed items-center gap-1.5 text-xs font-semibold text-white/30">
      <Download size={13} aria-hidden="true" />
      Download
      <span className="sr-only">
        {title} ({row.label}, not published yet)
      </span>
    </span>
  );
}

function CardGrid({ cards, icon: Icon }: { cards: Card[]; icon: LucideIcon }) {
  return (
    <ul className="mt-6 grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <li
          key={c.id}
          className="group overflow-hidden rounded-2xl border border-navy-line bg-navy-2 motion-safe:transition-colors hover:border-brand/40"
        >
          <div className="px-5 pt-4 pb-3.5">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-white group-hover:bg-brand group-hover:text-navy motion-safe:transition-[background-color,color,scale] motion-safe:duration-300 motion-safe:group-hover:scale-110"
              >
                <Icon size={15} />
              </span>
              <div className="min-w-0">
                <h4 className="truncate text-[15px] font-bold leading-snug text-white">{c.title}</h4>
                <p className="text-xs text-on-navy-muted">{c.when}</p>
              </div>
            </div>
          </div>
          <ul className="divide-y divide-white/10 border-t border-white/10">
            {c.rows.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-3 px-5 py-2">
                <span className="truncate text-[13px] text-white/85">{r.label}</span>
                <DownloadLink row={r} title={c.title} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

const subheading = "text-xl font-bold text-white md:text-2xl";

/*
  Documents and presentations in one section, as two card grids. A card's footer
  rows are its downloads (Group, or one per member for the theses); each becomes
  active once its `href` / `slidesHref` is set in the data. #presentations stays a nav anchor.
*/
export default function DocumentsSection() {
  return (
    <section id="documents" data-nav-section className="dark-section py-20 md:py-24">
      <Container>
        <SectionIntro
          dark
          eyebrow="Downloads"
          title="Documents and presentations."
          description="Every document and slide deck of the project, downloadable as soon as it is published."
        />

        <div className="mt-12">
          <h3 className={subheading}>Documents</h3>
          <p className="mt-2 text-on-navy-muted">All documents related to this project.</p>
          <CardGrid cards={docCards} icon={FileText} />
        </div>

        <div id="presentations" data-nav-section className="mt-12">
          <h3 className={subheading}>Presentations</h3>
          <p className="mt-2 text-on-navy-muted">Slides from every presentation of this project.</p>
          <CardGrid cards={slideCards} icon={PresentationIcon} />
        </div>
      </Container>
    </section>
  );
}
