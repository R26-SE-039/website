"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, sectionToNav } from "@/data/nav";
import { cn } from "@/lib/cn";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavDropdown from "./NavDropdown";

/** Scroll-spy: the nav item whose section is most visible is highlighted. Starts on "Home". */
function useActiveHref() {
  const [active, setActive] = useState("/#top");
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    if (sections.length === 0) return;
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best = "";
        let bestRatio = 0;
        for (const [id, r] of ratios) {
          if (r > bestRatio) {
            best = id;
            bestRatio = r;
          }
        }
        if (best && sectionToNav[best]) setActive(sectionToNav[best]);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Navbar() {
  const activeHref = useActiveHref();

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-[1720px] items-center justify-between px-5 md:h-[72px] md:px-14">
        <Link prefetch={false} href="/#top" className="flex items-center rounded-full">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = item.href === activeHref;
            return (
              <li key={item.href}>
                {item.children ? (
                  <NavDropdown item={item} active={active} />
                ) : (
                  <span className="relative block">
                    <Link
                      prefetch={false}
                      href={item.href}
                      aria-current={active ? "location" : undefined}
                      className={cn(
                        "block rounded-full px-3 py-2 text-[15px] font-medium transition-colors",
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

        <div className="flex items-center gap-2">
          <Link
            prefetch={false}
            href="/#contact"
            className="hidden min-h-11 items-center rounded-full bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1b2a44] md:inline-flex"
          >
            Contact Us
          </Link>
          <MobileMenu items={navItems} activeHref={activeHref} />
        </div>
      </nav>
    </header>
  );
}
