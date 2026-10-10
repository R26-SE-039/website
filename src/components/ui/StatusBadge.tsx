import type { DocStatus, Status } from "@/types/content";
import { cn } from "@/lib/cn";

type Props = { status: Status | DocStatus; className?: string };

const labels: Record<Status | DocStatus, string> = {
  completed: "Completed",
  upcoming: "Upcoming",
  available: "Available",
  pending: "Pending",
};

export default function StatusBadge({ status, className }: Props) {
  const positive = status === "completed" || status === "available";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs",
        positive ? "border-pass/40 bg-pass/10 text-pass" : "border-warn/40 bg-warn/10 text-warn",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", positive ? "bg-pass" : "bg-warn")} />
      {labels[status]}
    </span>
  );
}
