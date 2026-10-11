import { Download, FileText, Presentation as PresentationIcon, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { asset } from "@/lib/asset";
import { documents } from "@/data/documents";
import { presentations } from "@/data/presentations";
import type { DocumentItem } from "@/types/content";

type Row = { label: string; href?: string };
type Card = { id: string; title: string; when: string; rows: Row[] };

const placeholder = (v?: string) => !v || /^(TODO|TBA)\b/i.test(v.trim());

const docHref = (d: DocumentItem) => (d.status === "available" ? d.href : undefined);
const docWhen = (d: DocumentItem) =>
  !placeholder(d.date) ? `Submitted on ${d.date}` : d.status === "available" ? "Published" : "Not submitted yet";

// Group documents get one card each. The Final Report gets a full-width card whose
// rows are the group report plus one individual thesis per member, side by side.
const theses = documents.filter((d) => d.id.startsWith("final-c"));
const docCards: Card[] = documents
  .filter((d) => !d.id.startsWith("final-c") && d.id !== "final-group")
  .map((d) => ({
    id: d.id,
    title: d.title,
    when: docWhen(d),
    rows: [{ label: d.owner === "Group" ? "Group" : d.owner, href: docHref(d) }],
  }));

const finalDoc = documents.find((d) => d.id === "final-group");
const finalCard: Card | undefined = finalDoc && {
  id: finalDoc.id,
  title: "Final Report",
  when: docWhen(finalDoc),
  rows: [{ label: "Group", href: docHref(finalDoc) }, ...theses.map((t) => ({ label: t.owner, href: docHref(t) }))],
};

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

/** Full-width card whose download rows sit side by side (group report + one thesis per member). */
function WideCard({ card, icon }: { card: Card; icon: LucideIcon }) {
  return (
    <div className={`mt-4 ${cardClass}`}>
      <CardHead card={card} icon={icon} />
      <ul className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
        {card.rows.map((r) => (
          <li
            key={r.label}
            className="flex items-center justify-between gap-3 bg-navy-2 px-5 py-2.5 sm:last:col-span-2 lg:last:col-span-1"
          >
            <RowItem row={r} title={card.title} />
          </li>
        ))}
      </ul>
    </div>
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

        <div className="mx-auto mt-12 max-w-6xl">
          <h3 className={subheading}>Documents</h3>
          <p className="mt-2 text-center text-on-navy-muted">All documents related to this project.</p>
          <CardGrid cards={docCards} icon={FileText} cols="lg:grid-cols-3" />
          {finalCard && <WideCard card={finalCard} icon={FileText} />}
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
