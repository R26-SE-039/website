import { ChevronDown, ExternalLink as ExternalIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import StatusBadge from "@/components/ui/StatusBadge";
import { milestones } from "@/data/milestones";
import OpenFromHash from "./OpenFromHash";

export default function MilestonesSection() {
  return (
    <section id="milestones" data-nav-section className="bg-white py-24 md:py-32">
      <OpenFromHash />
      <Container>
        <SectionIntro
          eyebrow="Milestones"
          title="Every assessment, with its date and marks."
          description="Pick a milestone from the Milestones menu or expand one below for the details of that assessment."
        />

        <ol className="relative mt-14 space-y-4">
          <span aria-hidden="true" className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-line" />
          {milestones.map((m, i) => (
            <li key={m.id} className="relative pl-14">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-5 grid h-10 w-10 place-items-center rounded-2xl font-mono text-xs font-bold ${
                  m.status === "completed" ? "bg-navy text-white" : "border-[1.5px] border-line bg-white text-muted"
                }`}
              >
                0{i + 1}
              </span>
              <details id={m.id} className="group rounded-[24px] border border-line bg-white open:border-brand">
                <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-4 px-6 py-5">
                  <span>
                    <span className="block text-lg font-bold text-ink">{m.title}</span>
                    <span className="mt-1 block text-sm text-muted">{m.summary}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="rounded-full bg-surface px-3 py-1 font-mono text-xs text-muted">{m.date}</span>
                    <span className="rounded-full bg-surface px-3 py-1 font-mono text-xs text-muted">Marks {m.marks}</span>
                    <StatusBadge status={m.status} />
                    <ChevronDown size={18} aria-hidden="true" className="text-muted transition-transform group-open:rotate-180" />
                  </span>
                </summary>
                <div className="border-t border-line px-6 py-5">
                  <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-muted">
                    {m.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  {m.links && m.links.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-3">
                      {m.links.map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline"
                          >
                            {l.label} <ExternalIcon size={14} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
