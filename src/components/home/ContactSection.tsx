import { Mail, MapPin, Phone, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { site } from "@/data/site";
import { team } from "@/data/team";
import CopyButton from "./CopyButton";

export default function ContactSection() {
  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(site.emailTemplate.subject)}&body=${encodeURIComponent(site.emailTemplate.body)}`;
  const phones = team.filter((m) => m.phone);

  return (
    <section id="contact" data-nav-section className="bg-white py-24 md:py-32">
      <Container>
        <SectionIntro eyebrow="Contact us" title="Talk to the team." description="Questions about the research, the platform or collaboration are welcome." />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <li className="rounded-[24px] border border-line bg-surface p-6">
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-ink">
                <Mail size={20} />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted">Group email</p>
              <a href={`mailto:${site.contactEmail}`} className="mt-1 block text-base font-bold text-ink">
                {site.contactEmail}
              </a>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {team.map((m) => (
                  <li key={m.studentId + m.component}>
                    {m.name}: <a href={`mailto:${m.email}`} className="text-ink underline-offset-4 hover:underline">{m.email}</a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="rounded-[24px] border border-line bg-surface p-6">
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-ink">
                <Phone size={20} />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted">Phone</p>
              {phones.length ? (
                <ul className="mt-1 space-y-1 text-base font-bold text-ink">
                  {phones.map((m) => (
                    <li key={m.phone}>{m.phone}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-base font-bold text-ink">TODO: contact numbers</p>
              )}
            </li>
            <li className="rounded-[24px] border border-line bg-surface p-6 sm:col-span-2 lg:col-span-1">
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-ink">
                <MapPin size={20} />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted">Institution</p>
              <p className="mt-1 text-base font-bold text-ink">{site.institution}</p>
              <p className="text-sm text-muted">
                {site.faculty} · {site.department}
              </p>
            </li>
          </ul>

          <div className="rounded-[24px] border border-line bg-white p-7 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Email template</p>
            <p className="mt-2 text-base font-bold text-ink">{site.emailTemplate.subject}</p>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-surface p-5 font-sans text-[15px] leading-relaxed text-muted">
              {site.emailTemplate.body}
            </pre>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={mailto}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-ink hover:brightness-95"
              >
                <Send size={16} aria-hidden="true" /> Write to us
              </a>
              <CopyButton text={`Subject: ${site.emailTemplate.subject}\n\n${site.emailTemplate.body}`} label="Copy template" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
