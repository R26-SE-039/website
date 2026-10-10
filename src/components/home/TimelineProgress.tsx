"use client";

import { useEffect, useRef } from "react";

/*
  Centre line of the objectives timeline. Rendered inside the <ol>: the cyan fill
  follows the viewport centre as you scroll. Once the fill reaches a
  [data-timeline-dot], the dot and its [data-timeline-item] get data-active="true".
*/
export default function TimelineProgress() {
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const line = fill.current;
    const list = line?.parentElement;
    if (!line || !list) return;
    const dots = Array.from(list.querySelectorAll<HTMLElement>("[data-timeline-dot]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const reached = window.innerHeight / 2 - rect.top; // px of the list above the viewport centre
      const progress = Math.min(1, Math.max(0, reached / rect.height));
      line.style.transform = `scaleY(${progress})`;
      for (const dot of dots) {
        const d = dot.getBoundingClientRect();
        const active = String(d.top + d.height / 2 - rect.top <= reached);
        dot.dataset.active = active;
        const item = dot.closest<HTMLElement>("[data-timeline-item]");
        if (item) item.dataset.active = active;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <span aria-hidden="true" className="absolute top-0 left-5 h-full w-0.5 -translate-x-1/2 rounded-full bg-line md:left-1/2" />
      <span
        ref={fill}
        aria-hidden="true"
        style={{ transform: "scaleY(0)" }}
        className="absolute top-0 left-5 h-full w-0.5 origin-top -translate-x-1/2 rounded-full bg-brand shadow-[0_0_12px_rgba(0,194,255,0.6)] md:left-1/2"
      />
    </>
  );
}
