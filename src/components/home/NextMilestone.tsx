import { ArrowRight, CalendarClock } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import StatusBadge from "@/components/ui/StatusBadge";
import { milestones } from "@/data/milestones";

export default function NextMilestone() {
  const next = milestones.find((m) => m.status === "upcoming");
  if (!next) return null;

  return (
    <section className="border-t border-line py-16 md:py-20">
      <Container>
        <Link
          href={`/milestones/#${next.id}`}
          className="group flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand hover:bg-surface-2 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-start gap-4">
            <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
              <CalendarClock size={20} />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Next milestone</p>
              <p className="mt-1 text-lg font-semibold text-ink">{next.title}</p>
              <p className="mt-1 text-sm text-muted">{next.summary}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:shrink-0">
            <span className="font-mono text-sm text-muted">{next.date}</span>
            <StatusBadge status={next.status} />
            <ArrowRight size={18} aria-hidden="true" className="text-brand transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </Container>
    </section>
  );
}
