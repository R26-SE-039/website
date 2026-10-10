"use client";

import { useEffect } from "react";

/** Opens the <details> whose id matches the URL hash and scrolls to it (navbar dropdown deep links). */
export default function OpenFromHash() {
  useEffect(() => {
    const apply = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: "start" });
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);
  return null;
}
