import { Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { site } from "@/data/site";
import { team } from "@/data/team";
import { mailtoHref } from "@/lib/contact";
import ContactForm from "./ContactForm";

/** Contact form in a navy panel, with the institution details and a direct e-mail link beside it. */
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

        <div className="relative mt-14 overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-8 md:p-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-32 size-80 rounded-full border border-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -bottom-16 size-52 rounded-full border border-brand/20"
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                  <MessageSquareText size={19} />
                </span>
                <h3 className="text-2xl font-bold leading-snug">Send us a message</h3>
              </div>
              <p className="mt-3 text-base leading-relaxed text-on-navy-muted">
                Fill in the form and we will get back to you within two working days.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>

            {/* Details */}
            <aside className="flex flex-col gap-4 lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-14">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Mail size={16} aria-hidden="true" className="text-brand" /> Prefer email?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-on-navy-muted">
                  Your mail client opens with our inquiry template already filled in: the subject, a greeting and a
                  space for your message.
                </p>
                <a
                  href={mailtoHref}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-white/20 px-5 text-sm font-semibold text-white motion-safe:transition-colors hover:border-brand hover:text-brand"
                >
                  Write to us
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <MapPin size={16} aria-hidden="true" className="text-brand" /> Where we are
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  <span className="block font-semibold text-white">{site.institution}</span>
                  <span className="text-on-navy-muted">
                    {site.faculty} · {site.department}
                    <br />
                    Malabe, Sri Lanka
                  </span>
                </p>
              </div>

              {phones.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Phone size={16} aria-hidden="true" className="text-brand" /> Phone
                  </p>
                  <p className="mt-2 text-sm text-on-navy-muted">{phones.map((m) => m.phone).join(" · ")}</p>
                </div>
              )}

              <p className="text-xs leading-relaxed text-on-navy-muted">
                Project {site.groupId} · supervised by {site.supervisor} and {site.coSupervisor}.
              </p>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
