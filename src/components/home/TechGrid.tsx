import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { technologies } from "@/data/domain";
import { asset } from "@/lib/asset";

const initials = (name: string) =>
  name
    .replace(/\(.*?\)/g, "")
    .split(/[\s/.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

export default function TechGrid() {
  return (
    <section id="technologies" data-nav-section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionIntro eyebrow="Domain · Technologies used" title="The stack behind the loop." />
        <div className="mt-14 space-y-12">
          {technologies.map((cat) => (
            <div key={cat.category}>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted">{cat.category}</p>
              <ul className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
                {cat.items.map((t) => (
                  <li key={t.name} className="flex flex-col items-center text-center">
                    <span className="grid h-20 w-20 place-items-center rounded-full border border-line bg-white shadow-sm transition-transform hover:-translate-y-0.5">
                      {t.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element -- static SVG logo
                        <img src={asset(t.logo)} alt="" width={40} height={40} loading="lazy" />
                      ) : (
                        <span aria-hidden="true" className="font-logo text-base font-bold tracking-wide text-ink">
                          {initials(t.name)}
                        </span>
                      )}
                    </span>
                    <span className="mt-3 text-sm text-muted">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
