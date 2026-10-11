import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

type Props = { className?: string; inverted?: boolean };

/** QA mark + NEXTGEN QA wordmark in the geometric logo font. */
export default function Logo({ className, inverted = false }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-logo text-[1.05rem] font-bold uppercase leading-none tracking-[0.12em]",
        inverted ? "text-white" : "text-ink",
        className,
      )}
      role="img"
      aria-label="NextGen QA"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static logo mark */}
      <img src={asset("/logos/qa-mark.webp")} alt="" width={47} height={32} className="h-8 w-auto" />
      <span aria-hidden="true">NEXTGEN QA</span>
    </span>
  );
}
