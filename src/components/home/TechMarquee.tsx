import type { CSSProperties } from "react";
import { BrandUse } from "@/components/ui/BrandSprite";
import { brandIcons, type BrandSlug } from "@/data/brandIcons";
import { technologies } from "@/data/domain";

// Every tool with a brand mark, once each (pgvector reuses the PostgreSQL mark, so dedupe by icon).
const tools = [
  ...new Map(
    technologies
      .flatMap((c) => c.items)
      .filter((t) => t.icon && brandIcons[t.icon as BrandSlug])
      .map((t) => [t.icon, t] as const),
  ).values(),
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14" aria-hidden={hidden || undefined}>
      {tools.map((t) => {
        const { hex } = brandIcons[t.icon as BrandSlug];
        return (
          <li
            key={t.name}
            style={{ "--brand-hex": hex } as CSSProperties}
            className="flex items-center gap-2.5 whitespace-nowrap text-[15px] font-semibold text-ink"
          >
            <BrandUse slug={t.icon as BrandSlug} className="size-6 fill-(--brand-hex)" />
            {t.name}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Light band between the dark stats strip and the dark components section: the stack
 * scrolls past as a marquee (two identical rows, the track moves -50% and loops).
 * Transform-only, pauses on hover, static under prefers-reduced-motion. Marks come from <BrandSprite />.
 */
export default function TechMarquee() {
  return (
    <section aria-label="Technologies used" className="marquee overflow-hidden border-y border-line bg-white py-7 md:py-9">
      <div className="[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
