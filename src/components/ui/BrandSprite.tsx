import { brandIcons, type BrandSlug } from "@/data/brandIcons";
import { technologies } from "@/data/domain";

/** Brand slugs used by the technology sections, once each. */
export const techSlugs = [
  ...new Set(
    technologies.flatMap((c) => c.items.map((t) => t.icon)).filter((i): i is BrandSlug => !!i && i in brandIcons),
  ),
];

/** Inline sprite: each mark's path once per page; draw it with <BrandUse slug=… />. */
export default function BrandSprite() {
  return (
    <svg aria-hidden="true" className="hidden">
      {techSlugs.map((slug) => (
        <symbol key={slug} id={`bi-${slug}`} viewBox="0 0 24 24">
          <path d={brandIcons[slug].path} />
        </symbol>
      ))}
    </svg>
  );
}

export function BrandUse({ slug, className }: { slug: BrandSlug; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <use href={`#bi-${slug}`} />
    </svg>
  );
}
