"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0 })}
      className={cn(
        "fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink shadow-lg shadow-black/40 transition-all duration-200 hover:border-brand hover:bg-surface-2",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
