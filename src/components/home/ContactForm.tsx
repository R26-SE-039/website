"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { mailtoHref } from "@/lib/contact";

// EmailJS (https://www.emailjs.com, free plan: 200 emails/month). The three ids are public by design;
// set them in .env.local (see .env.example). Without them the form hands over to the mailto link.
const emailjs = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};
const configured = Boolean(emailjs.serviceId && emailjs.templateId && emailjs.publicKey);

export const subjects = [
  "Research collaboration",
  "Question about the platform",
  "Access to code or datasets",
  "Academic or supervision inquiry",
  "Other",
];

type Fields = { name: string; email: string; organization: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", organization: "", subject: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!f.subject) e.subject = "Choose what your message is about.";
  if (f.message.trim().length < 20) e.message = "Tell us a little more (at least 20 characters).";
  return e;
}

const field =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-white/35 outline-none motion-safe:transition-colors focus:border-brand focus:bg-white/[0.07] aria-[invalid=true]:border-[#f87171]";
const label = "mb-1.5 block text-sm font-semibold text-white/90";

/** Contact form: inline validation, honeypot, EmailJS send, mailto fallback. */
export default function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const set = (k: keyof Fields) => (v: string) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };
  const err = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const all = validate(values);
    setTouched({ name: true, email: true, organization: true, subject: true, message: true });
    setErrors(all);
    if (Object.keys(all).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    // Honeypot: bots fill the hidden "website" field; people never see it.
    if ((form.elements.namedItem("website") as HTMLInputElement | null)?.value) {
      setStatus("sent");
      return;
    }
    if (!configured) {
      window.location.href = mailtoHref;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: emailjs.serviceId,
          template_id: emailjs.templateId,
          user_id: emailjs.publicKey,
          template_params: {
            from_name: values.name.trim(),
            reply_to: values.email.trim(),
            organization: values.organization.trim() || "—",
            subject: values.subject,
            message: values.message.trim(),
          },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
      setValues(empty);
      setTouched({});
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center rounded-2xl border border-pass/40 bg-pass/10 p-6">
        <CheckCircle2 size={28} aria-hidden="true" className="text-pass" />
        <p className="mt-4 text-xl font-bold text-white">Message sent.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-on-navy-muted">
          Thanks for writing. We will get back to you within two working days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Your name <span className="text-brand">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Dr. Jane Smith"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            onBlur={blur("name")}
            aria-invalid={Boolean(err("name"))}
            aria-describedby={err("name") ? `${id}-name-err` : undefined}
            className={field}
          />
          <FieldError id={`${id}-name-err`} message={err("name")} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            Email address <span className="text-brand">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@university.ac.lk"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            onBlur={blur("email")}
            aria-invalid={Boolean(err("email"))}
            aria-describedby={err("email") ? `${id}-email-err` : undefined}
            className={field}
          />
          <FieldError id={`${id}-email-err`} message={err("email")} />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-org`} className={label}>
          Organization / institution
        </label>
        <input
          id={`${id}-org`}
          name="organization"
          type="text"
          autoComplete="organization"
          placeholder="University / company name"
          value={values.organization}
          onChange={(e) => set("organization")(e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label htmlFor={`${id}-subject`} className={label}>
          Subject <span className="text-brand">*</span>
        </label>
        <select
          id={`${id}-subject`}
          name="subject"
          value={values.subject}
          onChange={(e) => set("subject")(e.target.value)}
          onBlur={blur("subject")}
          aria-invalid={Boolean(err("subject"))}
          aria-describedby={err("subject") ? `${id}-subject-err` : undefined}
          className={cn(field, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23a9b6c9%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27><path d=%27m6 9 6 6 6-6%27/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 [&>option]:bg-navy-2 [&>option]:text-white", !values.subject && "text-white/35")}
        >
          <option value="" disabled>
            Select an inquiry type
          </option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <FieldError id={`${id}-subject-err`} message={err("subject")} />
      </div>

      <div>
        <label htmlFor={`${id}-message`} className={label}>
          Message <span className="text-brand">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          placeholder="Describe your inquiry or collaboration interest…"
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          onBlur={blur("message")}
          aria-invalid={Boolean(err("message"))}
          aria-describedby={err("message") ? `${id}-message-err` : undefined}
          className={cn(field, "min-h-[140px] resize-y")}
        />
        <FieldError id={`${id}-message-err`} message={err("message")} />
      </div>

      {/* Honeypot (hidden from people, tabbed past by assistive tech). */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "failed" && (
        <p role="alert" className="flex items-start gap-2 rounded-xl border border-[#f87171]/40 bg-[#f87171]/10 px-4 py-3 text-sm text-white">
          <CircleAlert size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[#f87171]" />
          <span>
            The message could not be sent. Try again, or{" "}
            <a href={mailtoHref} className="font-semibold text-brand underline-offset-4 hover:underline">
              email us directly
            </a>
            .
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-brand-ink motion-safe:transition-all hover:-translate-y-px hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle size={16} aria-hidden="true" className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" /> Send message
          </>
        )}
      </button>
      <p className="text-xs text-on-navy-muted">
        <span className="text-brand">*</span> Required. We reply from the team inbox within two working days.
      </p>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs text-[#fca5a5]">
      <CircleAlert size={13} aria-hidden="true" />
      {message}
    </p>
  );
}
