import { cn } from "@/lib/cn";

type Props = { eyebrow?: string; title: string; description?: string; className?: string; id?: string };

export default function SectionHeading({ eyebrow, title, description, className, id }: Props) {
  return (
    <div className={cn("max-w-prose", className)}>
      {eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.12em] text-muted">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base text-muted md:text-lg">{description}</p>}
    </div>
  );
}
