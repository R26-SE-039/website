import { Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { brandIcons, type BrandSlug } from "@/data/brandIcons";
import { site } from "@/data/site";
import { supervisors, team } from "@/data/team";
import { asset } from "@/lib/asset";

const department = site.department.replace(/^Department of /, "");

/** "Ms. Suriyaa Kumari" → "SK", "Abeygunasekara D.T." → "AD" */
const initials = (name: string) =>
  name
    .replace(/^(Mr|Ms|Mrs|Dr|Prof)\.\s*/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

type Link = { label: string; href: string; icon?: BrandSlug };

type Person = {
  name: string;
  badge: string;
  highlight?: boolean; // brand-coloured badge (group leader)
  facts: { label?: string; value: string }[];
  email: string;
  photo?: string;
  links: Link[];
  achievements?: string[];
};

function BrandMark({ slug }: { slug: BrandSlug }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d={brandIcons[slug].path} />
    </svg>
  );
}

function PersonCard({ p }: { p: Person }) {
  return (
    <li className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
      <div className="relative aspect-square overflow-hidden bg-navy">
        {p.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- static team photo
          <img
            src={asset(p.photo)}
            alt={`Photo of ${p.name}`}
            width={400}
            height={400}
            loading="lazy"
            className="size-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="grid size-full place-items-center">
            <span className="absolute -right-16 -bottom-16 size-56 rounded-full border border-white/10" />
            <span className="absolute -right-4 -bottom-4 size-32 rounded-full border border-brand/20" />
            <span className="font-logo text-5xl font-bold tracking-wider text-brand motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-110">
              {initials(p.name)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-ink">{p.name}</h3>
        <p className="mt-2">
          <span
            className={
              p.highlight
                ? "inline-flex rounded-md bg-brand px-2 py-0.5 text-[11px] font-semibold text-brand-ink"
                : "inline-flex rounded-md bg-navy px-2 py-0.5 text-[11px] font-semibold text-white"
            }
          >
            {p.badge}
          </span>
        </p>
        <dl className="mt-4 space-y-3 text-sm">
          {p.facts.map((f) => (
            <div key={f.value}>
              {f.label && <dt className="font-semibold text-ink">{f.label}</dt>}
              <dd className="text-muted">{f.value}</dd>
            </div>
          ))}
        </dl>
        {p.achievements && p.achievements.length > 0 && (
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
            {p.achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        )}
      </div>

      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-6 py-4 text-sm font-medium">
        {p.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0a8fbd] underline-offset-4 hover:underline"
            >
              {l.icon && <BrandMark slug={l.icon} />}
              {l.label}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
        <li>
          <a
            href={`mailto:${p.email}`}
            className="inline-flex items-center gap-1.5 text-[#0a8fbd] underline-offset-4 hover:underline"
          >
            <Mail size={16} aria-hidden="true" />
            E-Mail
          </a>
        </li>
      </ul>
    </li>
  );
}

const supervisorCards: Person[] = supervisors.map((s) => ({
  name: s.name,
  badge: s.role,
  facts: [{ value: site.institution }, { label: "Department", value: department }],
  email: s.email,
  photo: s.photo,
  links: [
    ...(s.scholar ? [{ label: "G-Scholar", href: s.scholar, icon: "googlescholar" as const }] : []),
    ...(s.linkedin ? [{ label: "LinkedIn", href: s.linkedin, icon: "linkedin" as const }] : []),
  ],
}));

const memberCards: Person[] = team.map((m) => ({
  name: m.name,
  badge: m.leader ? "Group Leader" : "Group Member",
  highlight: m.leader,
  facts: [
    { label: "Undergraduate", value: `${site.institution} · ${m.studentId}` },
    { label: "Department", value: department },
  ],
  email: m.email,
  photo: m.photo,
  links: [
    ...(m.linkedin ? [{ label: "LinkedIn", href: m.linkedin, icon: "linkedin" as const }] : []),
    ...(m.github ? [{ label: "GitHub", href: m.github, icon: "github" as const }] : []),
  ],
  achievements: m.achievements,
}));

const groupHeading = "font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#0a8fbd]";

export default function AboutSection() {
  return (
    <section id="about" data-nav-section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow="About us"
          title="Meet the team."
          description={`${site.groupId} · ${site.degree} · ${site.faculty}, ${site.institution}`}
        />

        <h3 className={`mt-14 ${groupHeading}`}>Supervisors</h3>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supervisorCards.map((p) => (
            <PersonCard key={p.name} p={p} />
          ))}
        </ul>

        <h3 className={`mt-14 ${groupHeading}`}>Research team</h3>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {memberCards.map((p) => (
            <PersonCard key={p.name} p={p} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
