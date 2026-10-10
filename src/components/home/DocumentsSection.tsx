import { Download, FileText, GraduationCap, Presentation as PresentationIcon, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { cn } from "@/lib/cn";
import { documents } from "@/data/documents";
import { presentations } from "@/data/presentations";

type Row = {
  id: string;
  title: string;
  meta: string;
  done: boolean; // completed / available
  statusLabel: string;
  href?: string;
};

const isPlaceholder = (v: string) => /^(TODO|TBA)$/i.test(v.trim());

const projectDocs: Row[] = documents
  .filter((d) => !d.id.startsWith("final-c"))
  .map((d) => ({
    id: d.id,
    title: d.title,
    meta: `${d.owner} · ${d.format}`,
    done: d.status === "available",
    statusLabel: d.status === "available" ? "Available" : "Pending",
    href: d.status === "available" ? d.href : undefined,
  }));

// "Individual Thesis — Component 2: Intelligent Test Case Generation" → "Component 2 thesis" + topic
const theses: Row[] = documents
  .filter((d) => d.id.startsWith("final-c"))
  .map((d) => {
    const topic = d.title.split(": ")[1] ?? d.title;
    return {
      id: d.id,
      title: `Component ${d.id.slice(-1)} · ${topic}`,
      meta: `${d.owner} · ${d.format}`,
      done: d.status === "available",
      statusLabel: d.status === "available" ? "Available" : "Pending",
      href: d.status === "available" ? d.href : undefined,
    };
  });

const slideRows: Row[] = presentations.map((p) => ({
  id: p.id,
  title: p.title,
  meta: isPlaceholder(p.date) ? "Slides · PDF" : `${p.date} · Slides`,
  done: p.status === "completed",
  statusLabel: p.status === "completed" ? "Completed" : "Upcoming",
  href: p.slidesHref,
}));

function DownloadButton({ href, title }: { href?: string; title: string }) {
  if (href) {
    return (
      <a
        href={href}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-brand-ink hover:brightness-95"
      >
        <Download size={14} aria-hidden="true" />
        Download
        <span className="sr-only">{title}</span>
      </a>
    );
  }
  return (
    <span
      aria-disabled="true"
      title="Not published yet"
      className="inline-flex shrink-0 cursor-not-allowed items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/35"
    >
      <Download size={14} aria-hidden="true" />
      Download
      <span className="sr-only">{title} (not published yet)</span>
    </span>
  );
}

function Column({ id, icon: Icon, title, rows }: { id?: string; icon: LucideIcon; title: string; rows: Row[] }) {
  const ready = rows.filter((r) => r.href).length;
  return (
    <div id={id} data-nav-section={id ? "" : undefined} className="p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2.5 font-bold text-white">
          <Icon size={18} aria-hidden="true" className="text-brand" />
          {title}
        </h3>
        <span className="font-mono text-[11px] text-on-navy-muted">
          {ready}/{rows.length} ready
        </span>
      </div>
      <ul className="mt-4">
        {rows.map((r) => (
          <li key={r.id} className="group flex items-center gap-3 border-b border-white/10 py-3.5 last:border-b-0">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-white/80 group-hover:bg-brand group-hover:text-navy motion-safe:transition-[background-color,color,scale] motion-safe:duration-300 motion-safe:group-hover:scale-110"
            >
              <Icon size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white" title={r.title}>
                {r.title}
              </p>
              <p className="mt-0.5 flex items-center gap-2 truncate text-xs text-on-navy-muted">
                <span
                  aria-hidden="true"
                  className={cn("size-1.5 shrink-0 rounded-full", r.done ? "bg-pass" : "bg-warn")}
                />
                <span className={r.done ? "text-[#4ade80]" : "text-[#fbbf24]"}>{r.statusLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{r.meta}</span>
              </p>
            </div>
            <DownloadButton href={r.href} title={r.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
  Documents and presentations in one compact panel: three equal columns of four
  rows each. Every row has a Download button that becomes active once its file is
  published (set `href` / `slidesHref` in the data). #presentations stays a nav anchor.
*/
export default function DocumentsSection() {
  return (
    <section id="documents" data-nav-section className="dark-section py-20 md:py-24">
      <Container>
        <SectionIntro
          dark
          eyebrow="Downloads · Documents & presentations"
          title="Documents and slides, ready to download."
          description="Each file becomes downloadable as soon as it is published."
        />

        <div className="mt-12 grid overflow-hidden rounded-3xl border border-navy-line bg-navy-2 lg:grid-cols-3 lg:divide-x lg:divide-white/10 max-lg:divide-y max-lg:divide-white/10">
          <Column icon={FileText} title="Project documents" rows={projectDocs} />
          <Column icon={GraduationCap} title="Individual theses" rows={theses} />
          <Column id="presentations" icon={PresentationIcon} title="Presentations" rows={slideRows} />
        </div>
      </Container>
    </section>
  );
}
