import type { CSSProperties } from "react";
import {
  AudioLines,
  BrainCircuit,
  Cloud,
  FlaskConical,
  Gauge,
  Monitor,
  Server,
  Trees,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { brandIcons, type BrandSlug } from "@/data/brandIcons";
import { technologies } from "@/data/domain";

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Monitor,
  Backend: Server,
  "AI / ML": BrainCircuit,
  Testing: FlaskConical,
  "DevOps & Cloud": Cloud,
  "Speech, retrieval & coverage": AudioLines,
};

// Tools without a brand mark get a line icon instead, in a colour that fits the tool.
const fallbackIcons: Record<string, LucideIcon> = {
  RandomForest: Trees,
  "nyc / Istanbul": Gauge,
  "coverage.py": Gauge,
};
const fallbackHex: Record<string, string> = {
  RandomForest: "#3F8F3F",
  "nyc / Istanbul": "#CB3837", // npm red
  "coverage.py": "#3776AB", // Python blue
};

function Logo({ icon, name }: { icon?: string; name: string }) {
  const brand = icon ? brandIcons[icon as BrandSlug] : undefined;
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
        <path d={brand.path} />
      </svg>
    );
  }
  const Fallback = fallbackIcons[name] ?? Gauge;
  return <Fallback size={22} aria-hidden="true" />;
}

/** Technologies by category: real brand marks in their brand colour on a light tint of it. */
export default function TechGrid() {
  return (
    <section id="technologies" data-nav-section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow="Domain · Technologies used"
          title="The stack behind the loop."
          description="What each part of NextGen QA is built and run with, from the dashboard to the speech pipeline."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {technologies.map((cat) => {
            const CatIcon = categoryIcons[cat.category] ?? Server;
            return (
              <section key={cat.category} className="rounded-3xl border border-line bg-white p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-navy text-brand">
                      <CatIcon size={18} />
                    </span>
                    <h3 className="text-lg font-bold text-ink">{cat.category}</h3>
                  </div>
                  <span className="text-xs text-muted">{cat.items.length} tools</span>
                </div>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {cat.items.map((t) => {
                    const hex = (t.icon ? brandIcons[t.icon as BrandSlug]?.hex : undefined) ?? fallbackHex[t.name];
                    return (
                      <li
                        key={t.name}
                        style={{ "--brand-hex": hex ?? "var(--color-brand)" } as CSSProperties}
                        className="group flex items-center gap-3 rounded-2xl p-2.5 motion-safe:transition-colors hover:bg-surface"
                      >
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-(--brand-hex)/25 bg-(--brand-hex)/8 text-(--brand-hex) motion-safe:transition-[border-color,scale] motion-safe:duration-300 group-hover:border-(--brand-hex) motion-safe:group-hover:scale-110">
                          <Logo icon={t.icon} name={t.name} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink">{t.name}</span>
                          {t.use && <span className="block text-xs leading-snug text-muted">{t.use}</span>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
