import Link from "next/link";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import Container from "@/components/ui/Container";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-1 text-sm text-muted">{site.subtitle}</p>
          <p className="mt-3 font-mono text-xs text-muted">
            {site.groupId} · {site.institution}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Sections</p>
          <ul className="grid grid-cols-2 gap-1.5 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Contact</p>
          <p className="text-sm text-muted">{site.contactEmail}</p>
          <p className="mt-1 text-sm text-muted">
            {site.faculty}, {site.institution}
          </p>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-muted">
          <span>
            © {site.year} {site.shortName} · {site.groupId}
          </span>
          <span>Supervised by {site.supervisor} and {site.coSupervisor}</span>
        </Container>
      </div>
    </footer>
  );
}
