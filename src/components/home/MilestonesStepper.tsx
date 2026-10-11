"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CalendarDays, Check, ExternalLink as ExternalIcon, Flag, Trophy } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";
import type { Milestone } from "@/types/content";

const pending = (v: string) => /^(TODO|TBA)\b/i.test(v.trim());
const show = (v: string) => (pending(v) ? "To be confirmed" : v);

/*
  Stepper across the top (completed steps navy with a tick, cyan fill up to the
  latest completed one) and the selected milestone's details below. Each step
  button carries the milestone id, so navbar links like /#pp1 select it.
*/
export default function MilestonesStepper({ milestones }: { milestones: Milestone[] }) {
  const lastDone = milestones.reduce((acc, m, i) => (m.status === "completed" ? i : acc), -1);
  const firstUpcoming = milestones.findIndex((m) => m.status === "upcoming");
  const [active, setActive] = useState(firstUpcoming === -1 ? milestones.length - 1 : firstUpcoming);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Deep links from the navbar dropdown: select the milestone named in the hash.
  useEffect(() => {
    const apply = () => {
      const i = milestones.findIndex((m) => m.id === window.location.hash.slice(1));
      if (i === -1) return;
      setActive(i);
      document.getElementById("milestones")?.scrollIntoView({ block: "start" });
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [milestones]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + milestones.length) % milestones.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const m = milestones[active];
  const details = m.details.filter((d) => !/^TODO/i.test(d));
  const fill = milestones.length > 1 ? Math.max(0, lastDone) / (milestones.length - 1) : 0;
  const edge = 50 / milestones.length; // % from each side to the first/last step centre

  return (
    <div className="mt-12">
      {/* Stepper */}
      <div className="-mx-5 -my-3 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label="Milestones"
          style={{ gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))` }}
          className="relative grid min-w-[640px]"
        >
          {/* track + progress, running between the first and last step centres */}
          <span
            aria-hidden="true"
            style={{ left: `${edge}%`, right: `${edge}%` }}
            className="absolute top-[22px] h-0.5 rounded-full bg-line"
          />
          <span
            aria-hidden="true"
            style={{ left: `${edge}%`, width: `${fill * (100 - 2 * edge)}%` }}
            className="absolute top-[22px] h-0.5 rounded-full bg-brand"
          />
          {milestones.map((ms, i) => {
            const done = ms.status === "completed";
            const selected = i === active;
            return (
              <button
                key={ms.id}
                id={ms.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="milestone-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group relative flex flex-col items-center px-2 text-center"
              >
                <span
                  className={cn(
                    "grid size-11 place-items-center rounded-2xl text-xs font-bold motion-safe:transition-[background-color,color,box-shadow,scale] motion-safe:duration-300 motion-safe:group-hover:scale-110",
                    done ? "bg-navy text-brand" : "border-2 border-line bg-white text-muted",
                    selected && "shadow-[0_0_0_6px_rgba(0,194,255,0.22)]",
                    selected && !done && "border-brand text-ink",
                  )}
                >
                  {done ? <Check size={18} aria-hidden="true" /> : `0${i + 1}`}
                </span>
                <span
                  className={cn(
                    "mt-3 text-sm font-semibold leading-snug motion-safe:transition-colors",
                    selected ? "text-ink" : "text-muted group-hover:text-ink",
                  )}
                >
                  {ms.title}
                </span>
                <span className="mt-0.5 text-[11px] text-muted">{done ? "Completed" : "Upcoming"}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected milestone */}
      <div
        id="milestone-panel"
        role="tabpanel"
        aria-labelledby={m.id}
        className="mt-8 grid gap-8 rounded-3xl border border-line bg-surface p-6 md:p-8 lg:grid-cols-12 lg:gap-10"
      >
        <div className="lg:col-span-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a8fbd]">
            Milestone 0{active + 1} of 0{milestones.length}
          </p>
          <h3 className="mt-3 text-2xl font-bold leading-snug text-ink md:text-3xl">{m.title}</h3>
          <p className="mt-3 text-[17px] leading-relaxed text-muted">{m.summary}</p>
          {details.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {details.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-1 grid size-5 shrink-0 place-items-center rounded-md bg-brand/15">
                    <Check size={13} className="text-[#0a8fbd]" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          )}
          {m.links && m.links.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {m.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline"
                  >
                    {l.label} <ExternalIcon size={14} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <dl className="grid gap-3 self-start sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
          {[
            { icon: CalendarDays, label: "Date", value: show(m.date) },
            { icon: Trophy, label: "Marks", value: show(m.marks) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
              <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy text-brand">
                <Icon size={18} />
              </span>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">{label}</dt>
                <dd className="mt-0.5 font-semibold text-ink">{value}</dd>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy text-brand">
              <Flag size={18} />
            </span>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">Status</dt>
              <dd className="mt-0.5">
                <StatusBadge status={m.status} />
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
}
