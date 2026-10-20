import { Download, FileText, Presentation as PresentationIcon, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { asset } from "@/lib/asset";
import { documentCategories, documents, researchPaper } from "@/data/documents";
import { presentations } from "@/data/presentations";
import type { DocumentItem } from "@/types/content";

type Row = { label: string; href?: string };
type Card = { id: string; title: string; when: string; rows: Row[] };

const placeholder = (v?: string) => !v || /^(TODO|TBA)\b/i.test(v.trim());

// One column per document category; each column lists its documents as rows
// (the final column holds the group report plus one individual report per member).
const docColumns = documentCategories.map((c) => ({
  id: c.id,
  title: c.title,
  items: documents.filter((d) => d.category === c.id),
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
    // Files in public/docs/ get the base path and a tidy saved name; external links open as they are.
    const local = row.href.startsWith("/");
    return (
      <a
        href={local ? asset(row.href) : row.href}
        download={local ? `R26-SE-039-${row.href.split("/").pop()}` : undefined}
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

const cardClass =
  "group overflow-hidden rounded-2xl border border-navy-line bg-navy-2 motion-safe:transition-colors hover:border-brand/40";

function CardHead({ card, icon: Icon }: { card: Card; icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-3 px-5 pt-4 pb-3.5">
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-white group-hover:bg-brand group-hover:text-navy motion-safe:transition-[background-color,color,scale] motion-safe:duration-300 motion-safe:group-hover:scale-110"
      >
        <Icon size={15} />
      </span>
      <div className="min-w-0">
        <h4 className="truncate text-[15px] font-bold leading-snug text-white">{card.title}</h4>
        <p className="text-xs text-on-navy-muted">{card.when}</p>
      </div>
    </div>
  );
}

function RowItem({ row, title }: { row: Row; title: string }) {
  return (
    <>
      <span className="truncate text-[13px] text-white/85">{row.label}</span>
      <DownloadLink row={row} title={title} />
    </>
  );
}

/** Equal-height cards, one download row each. `cols` sets the desktop column count. */
function CardGrid({ cards, icon, cols }: { cards: Card[]; icon: LucideIcon; cols: string }) {
  return (
    <ul className={`mt-6 grid gap-4 sm:grid-cols-2 ${cols}`}>
      {cards.map((c) => (
        <li key={c.id} className={`${cardClass} flex flex-col`}>
          <CardHead card={c} icon={icon} />
          <ul className="mt-auto divide-y divide-white/10 border-t border-white/10">
            {c.rows.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-3 px-5 py-2">
                <RowItem row={r} title={c.title} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

const docHref = (d: DocumentItem) => (d.status === "available" ? d.href : undefined);

// Saved name: the file's own name, prefixed with the group id unless it already carries one.
const fileName = (href: string) => {
  const n = href.split("/").pop() ?? "document.pdf";
  return n.startsWith("R26-SE-") ? n : `R26-SE-039-${n}`;
};

/** One document row: title + small caption on the left, a Download button (or "Pending") on the right. */
function DocRow({ doc }: { doc: DocumentItem }) {
  const href = docHref(doc);
  const caption = doc.subtitle ?? (doc.owner === "Group" ? "Group document" : doc.owner);
  return (
    <li className="flex items-center justify-between gap-3 px-5 py-3.5">
      <div className="min-w-0">
        <p className="text-[13.5px] font-semibold leading-snug text-white">{doc.title}</p>
        <p className="mt-0.5 text-xs leading-snug text-on-navy-muted">{caption}</p>
      </div>
      {href ? (
        <a
          href={href.startsWith("/") ? encodeURI(asset(href)) : href}
          download={href.startsWith("/") ? fileName(href) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand/40 px-3 py-1 text-xs font-semibold text-brand motion-safe:transition-colors hover:bg-brand hover:text-navy"
        >
          <Download size={12} aria-hidden="true" />
          Download
          <span className="sr-only">{doc.title}</span>
        </a>
      ) : (
        <span
          title="Not published yet"
          className="inline-flex shrink-0 items-center rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/35"
        >
          Pending
          <span className="sr-only"> — {doc.title} is not published yet</span>
        </span>
      )}
    </li>
  );
}

/** Highlighted research paper banner above the columns. */
function PaperBanner({ doc }: { doc: DocumentItem }) {
  const href = doc.href ?? "";
  return (
    <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-brand/40 bg-navy-2 p-6 shadow-[0_24px_60px_-35px_rgba(0,194,255,0.35)] md:flex-row md:items-center md:justify-between md:gap-8 md:px-8">
      <div className="flex items-start gap-4">
        <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand text-navy">
          <FileText size={20} />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Research paper</p>
          <h4 className="mt-1.5 text-lg font-bold leading-snug text-white md:text-xl">{doc.title}</h4>
          <p className="mt-1 text-sm text-on-navy-muted">{doc.subtitle}</p>
        </div>
      </div>
      <a
        href={encodeURI(asset(href))}
        download="R26-SE-039-Research-Paper.pdf"
        className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-brand-ink motion-safe:transition-all hover:-translate-y-px hover:brightness-95"
      >
        <Download size={16} aria-hidden="true" />
        Download paper
      </a>
    </div>
  );
}

function DocColumn({ title, items, icon: Icon }: { title: string; items: DocumentItem[]; icon: LucideIcon }) {
  return (
    <li className={`${cardClass} flex flex-col`}>
      <div className="flex items-center gap-2.5 bg-brand px-5 py-3.5 text-navy">
        <Icon size={16} aria-hidden="true" />
        <h4 className="text-[15px] font-bold leading-snug">{title}</h4>
      </div>
      <ul className="divide-y divide-white/10">
        {items.map((d) => (
          <DocRow key={d.id} doc={d} />
        ))}
      </ul>
    </li>
  );
}

const subheading = "text-center text-xl font-bold text-white md:text-2xl";

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
          align="center"
          eyebrow="Downloads"
          title="Documents and presentations."
          description="Every document and slide deck of the project, downloadable as soon as it is published."
        />

        <div className="mx-auto mt-12 max-w-7xl">
          <h3 className={subheading}>Documents</h3>
          <p className="mt-2 text-center text-on-navy-muted">All documents related to this project.</p>
          <PaperBanner doc={researchPaper} />
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {docColumns.map((c) => (
              <DocColumn key={c.id} title={c.title} items={c.items} icon={FileText} />
            ))}
          </ul>
        </div>

        <div id="presentations" data-nav-section className="mx-auto mt-12 max-w-6xl">
          <h3 className={subheading}>Presentations</h3>
          <p className="mt-2 text-center text-on-navy-muted">Slides from every presentation of this project.</p>
          <CardGrid cards={slideCards} icon={PresentationIcon} cols="lg:grid-cols-4" />
        </div>
      </Container>
    </section>
  );
}
