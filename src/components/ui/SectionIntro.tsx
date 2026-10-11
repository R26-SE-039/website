import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
};

/** Consistent section opener: eyebrow (small caps, cyan), large heading, optional lede. */
export default function SectionIntro({ eyebrow, title, description, align = "left", className, dark = false }: Props) {
  return (
    <div className={cn("max-w-[760px]", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("text-xs font-semibold uppercase tracking-[0.14em]", dark ? "text-brand" : "text-[#0a8fbd]")}>{eyebrow}</p>
      <h2 className={cn("mt-4 text-3xl font-bold leading-[1.08] md:text-[2.75rem]", dark ? "text-white" : "text-ink")}>{title}</h2>
      {description && (
        <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-on-navy-muted" : "text-muted")}>{description}</p>
      )}
    </div>
  );
}
