import { cn } from "@/lib/cn";

type Props = { className?: string; inverted?: boolean };

/** Text wordmark in the geometric logo font: NEXTGEN · QA with a cyan mark. */
export default function Logo({ className, inverted = false }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-logo text-[1.05rem] font-bold uppercase leading-none tracking-[0.12em]",
        inverted ? "text-white" : "text-ink",
        className,
      )}
      role="img"
      aria-label="NextGen QA"
    >
      <span aria-hidden="true">NEXTGEN</span>
      <span aria-hidden="true" className="mx-1 inline-block h-[0.42em] w-[0.42em] translate-y-[-0.05em] rounded-sm bg-brand" />
      <span aria-hidden="true">QA</span>
    </span>
  );
}
