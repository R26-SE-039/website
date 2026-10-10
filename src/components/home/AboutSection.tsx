import { Link2, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { site } from "@/data/site";
import { supervisors, team } from "@/data/team";
import { asset } from "@/lib/asset";
import type { ComponentNo } from "@/types/content";

const colors: Record<ComponentNo, string> = {
  1: "var(--color-c1)",
  2: "var(--color-c2)",
  3: "var(--color-c3)",
  4: "var(--color-c4)",
};

export default function AboutSection() {
  return (
    <section id="about" data-nav-section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow="About us"
          title="Four members, one closed loop."
          description={`${site.groupId} · ${site.degree} · ${site.faculty}, ${site.institution}`}
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {team.map((m) => (
            <li key={m.studentId + m.component} className="rounded-[24px] border border-line bg-white p-6">
              {/* eslint-disable-next-line @next/next/no-img-element -- static team photo */}
              <img
                src={asset(m.photo)}
                alt={`Photo of ${m.name}`}
                width={400}
                height={400}
                loading="lazy"
                className="aspect-square w-full rounded-2xl object-cover"
              />
              <p className="mt-5 font-mono text-xs uppercase tracking-widest" style={{ color: colors[m.component] }}>
                Component {m.component}
              </p>
              <h3 className="mt-1 text-lg font-bold text-ink">{m.name}</h3>
              <p className="font-mono text-xs text-muted">{m.studentId}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                <li>
                  <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-brand">
                    <Mail size={13} aria-hidden="true" /> Email
                  </a>
                </li>
                {m.github && (
                  <li>
                    <a href={m.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-brand">
                      <Link2 size={13} aria-hidden="true" /> GitHub
                    </a>
                  </li>
                )}
                {m.linkedin && (
                  <li>
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-brand">
                      <Link2 size={13} aria-hidden="true" /> LinkedIn
                    </a>
                  </li>
                )}
              </ul>
              {m.achievements && m.achievements.length > 0 && (
                <ul className="mt-4 list-disc pl-5 text-sm text-muted">
                  {m.achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-[24px] bg-white p-7">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted">Supervision</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {supervisors.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-4 rounded-2xl border border-line px-5 py-4">
                <div>
                  <p className="text-xs text-muted">{s.role}</p>
                  <p className="text-base font-bold text-ink">{s.name}</p>
                </div>
                <a href={`mailto:${s.email}`} className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
                  {s.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
