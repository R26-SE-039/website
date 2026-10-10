import { MapPin, Phone, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { site } from "@/data/site";
import { team } from "@/data/team";
import { mailtoHref } from "@/lib/contact";

/** One horizontal "write to us" panel: mailto pre-filled with the e-mail template, plus institution details. */
export default function ContactSection() {
  const phones = team.filter((m) => m.phone);

  return (
    <section id="contact" data-nav-section className="bg-white py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow="Contact us"
          title="Talk to the team."
          description="Questions about the research, the platform or collaboration are welcome."
        />

        <div className="relative mt-14 overflow-hidden rounded-3xl bg-navy p-7 text-white md:p-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-32 size-80 rounded-full border border-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -bottom-16 size-52 rounded-full border border-brand/20"
          />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-5">
              <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/15 text-brand">
                <Send size={22} />
              </span>
              <div>
                <h3 className="text-2xl font-bold leading-snug">Write to the team</h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-on-navy-muted">
                  Your email opens with our inquiry template already filled in: the subject, a greeting and a space for
                  your message.
                </p>
              </div>
            </div>
            <a
              href={mailtoHref}
              className="inline-flex min-h-12 w-fit shrink-0 items-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-brand-ink hover:brightness-95 max-md:ml-17"
            >
              <Send size={16} aria-hidden="true" /> Write to us
            </a>
          </div>

          <div className="relative mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm md:flex-row md:items-start md:gap-12">
            <p className="flex items-start gap-3">
              <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
              <span>
                <span className="block font-semibold text-white">{site.institution}</span>
                <span className="text-on-navy-muted">
                  {site.faculty} · {site.department} · Malabe, Sri Lanka
                </span>
              </span>
            </p>
            {phones.length > 0 && (
              <p className="flex items-start gap-3">
                <Phone size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
                <span className="text-on-navy-muted">{phones.map((m) => m.phone).join(" · ")}</span>
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
