import { ArrowUpRight, Code2, Send } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { mailtoHref } from "@/lib/contact";
import Logo from "./Logo";

const resources = [
  { label: "GitHub organisation", href: site.links.github, icon: Code2 },
];

const heading = "mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand";

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
        {/* Brand */}
        <div className="lg:col-span-5">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-navy-muted">
            {site.subtitle}: from a spoken requirement to a validated, traceable, self-healing test.
          </p>
          <a
            href={mailtoHref}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-ink hover:brightness-95"
          >
            <Send size={15} aria-hidden="true" /> Write to us
          </a>
        </div>

        {/* Sections */}
        <nav aria-label="Footer" className="lg:col-span-4">
          <p className={heading}>Sections</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  prefetch={false}
                  href={item.href}
                  className="text-on-navy-muted transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resources */}
        <div className="lg:col-span-3">
          <p className={heading}>Resources</p>
          <ul className="space-y-2 text-sm">
            {resources.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-on-navy-muted transition-colors hover:text-white"
                >
                  <r.icon size={14} aria-hidden="true" className="text-brand" />
                  {r.label}
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="motion-safe:transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 text-xs text-on-navy-muted">
          <span>
            © {site.year} {site.shortName} · {site.groupId} · {site.institution}
          </span>
        </Container>
      </div>
    </footer>
  );
}
