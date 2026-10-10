import type { DocStatus, Status } from "@/types/content";
import { cn } from "@/lib/cn";

type Props = { status: Status | DocStatus; className?: string; dark?: boolean };

const labels: Record<Status | DocStatus, string> = {
  completed: "Completed",
  upcoming: "Upcoming",
  available: "Available",
  pending: "Pending",
};

/** Pass `dark` on navy backgrounds: lighter text keeps the label readable there. */
export default function StatusBadge({ status, className, dark = false }: Props) {
  const positive = status === "completed" || status === "available";
  const text = positive ? (dark ? "text-[#4ade80]" : "text-[#15803d]") : dark ? "text-[#fbbf24]" : "text-[#b45309]";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs",
        positive ? "border-pass/40 bg-pass/10" : "border-warn/40 bg-warn/10",
        text,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", positive ? "bg-pass" : "bg-warn")} />
      {labels[status]}
    </span>
  );
}
