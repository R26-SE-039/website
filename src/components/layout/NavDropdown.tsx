"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/types/content";
import { cn } from "@/lib/cn";

type Props = { item: NavItem; active: boolean };

export default function NavDropdown({ item, active }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center">
        <Link
          prefetch={false}
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "rounded-full py-2 pl-3 pr-1 text-sm font-medium transition-colors",
            active ? "text-ink" : "text-muted hover:text-ink",
          )}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`Open ${item.label} menu`}
          onClick={() => setOpen((v) => !v)}
          className={cn("rounded-full p-1 pr-2 text-muted transition-colors hover:text-ink", active && "text-ink")}
        >
          <ChevronDown size={14} aria-hidden="true" className={cn("transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {active && <span aria-hidden="true" className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-brand" />}
      <div
        id={panelId}
        role="menu"
        hidden={!open}
        className="absolute left-0 top-full z-50 min-w-56 pt-2"
      >
        <ul className="rounded-xl border border-line bg-surface p-1.5 shadow-xl shadow-black/40">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                prefetch={false}
                href={child.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
