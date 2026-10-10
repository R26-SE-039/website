"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import MobileMenu from "./MobileMenu";
import NavDropdown from "./NavDropdown";

// Normalise trailing slashes: with `trailingSlash: true` the server and the
// client can disagree on "/domain" vs "/domain/", which would break hydration.
const norm = (p: string) => p.replace(/\/+$/, "") || "/";
const isActive = (href: string, pathname: string) =>
  href === "/" ? norm(pathname) === "/" : norm(pathname).startsWith(norm(href));

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/80 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <Link prefetch={false} href="/" className="flex items-center gap-2.5 rounded-full">
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-lg bg-brand-strong font-mono text-sm font-bold text-white">
            Q
          </span>
          <span className="text-base font-semibold tracking-tight text-ink">{site.shortName}</span>
          <span className="hidden font-mono text-xs text-muted sm:inline">{site.groupId}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <li key={item.href}>
                {item.children ? (
                  <NavDropdown item={item} active={active} />
                ) : (
                  <span className="relative block">
                    <Link
                      prefetch={false}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-full px-3 py-2 text-sm font-medium transition-colors",
                        active ? "text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                    {active && <span aria-hidden="true" className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-brand" />}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <MobileMenu items={navItems} pathname={norm(pathname)} />
      </nav>
    </header>
  );
}
