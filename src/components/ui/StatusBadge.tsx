import type { DocStatus, Status } from "@/types/content";
import { cn } from "@/lib/cn";

type Props = { status: Status | DocStatus; className?: string; dark?: boolean };

const labels: Record<Status | DocStatus, string> = {
  completed: "Completed",
  upcoming: "Upcoming",
  available: "Available",
  pending: "Pending",
};

/**
 * Status as a plain word in the body font: green when done, normal text colour
 * otherwise. Pass `dark` on navy backgrounds.
 */
export default function StatusBadge({ status, className, dark = false }: Props) {
  const positive = status === "completed" || status === "available";
  const colour = positive ? (dark ? "text-[#4ade80]" : "text-[#15803d]") : dark ? "text-white" : "text-ink";
  return <span className={cn("font-semibold", colour, className)}>{labels[status]}</span>;
}
