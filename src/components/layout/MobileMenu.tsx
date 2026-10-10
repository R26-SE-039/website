"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { NavItem } from "@/types/content";
import { cn } from "@/lib/cn";

type Props = { items: NavItem[]; activeHref: string };

// Hydration-safe "is the DOM available" flag for the portal (false on the server, true after mount).
const noop = () => () => {};
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

export default function MobileMenu({ items, activeHref }: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const mounted = useMounted();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="rounded-full p-2 text-ink transition-colors hover:bg-surface-2"
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            hidden={!open}
            className="fixed inset-x-0 bottom-0 top-16 z-[70] overflow-y-auto border-t border-line bg-white px-5 py-6 md:hidden"
          >
        <ul className="space-y-1">
          {items.map((item) => {
            const active = item.href === activeHref;
            if (!item.children) {
              return (
                <li key={item.href}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium",
                      active ? "bg-surface-2 text-ink" : "text-muted hover:bg-surface hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            return (
              <li key={item.href}>
                {/* Never server-render `open`: Lighthouse's Chrome reports a React hydration
                    mismatch (#418) for a pre-opened <details>, which forces a full client
                    re-render and doubles blocking time. Groups start collapsed. */}
                <details className="group rounded-xl">
                  <summary
                    className={cn(
                      "flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-base font-medium",
                      active ? "bg-surface-2 text-ink" : "text-muted hover:bg-surface hover:text-ink",
                    )}
                  >
                    {item.label}
                    <ChevronDown size={16} aria-hidden="true" className="transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-1 space-y-1 pl-4">
                    <li>
                      <Link prefetch={false} href={item.href} onClick={close} className="block rounded-lg px-4 py-2 text-sm text-ink">
                        Overview
                      </Link>
                    </li>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          prefetch={false}
                          href={child.href}
                          onClick={close}
                          className="block rounded-lg px-4 py-2 text-sm text-muted hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          })}
        </ul>
          </div>,
          document.body,
        )}
    </div>
  );
}
