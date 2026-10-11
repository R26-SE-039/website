import { Check, Compass, Minus, ScanSearch, ShieldOff, TrendingDown, X } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { gapColumns, gapRows, gaps } from "@/data/domain";
import { asset } from "@/lib/asset";
import type { GapMark } from "@/types/content";

const icons = [ScanSearch, Compass, ShieldOff, TrendingDown];

/** `strong` = the NextGen QA column: a solid green "Yes" so our column reads at a glance. */
function Mark({ value, strong = false }: { value: GapMark; strong?: boolean }) {
  if (value === "yes")
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
          strong ? "bg-[#15803d] text-white shadow-sm" : "bg-pass/10 text-[#15803d]"
        }`}
      >
        <Check size={13} aria-hidden="true" /> Yes
      </span>
    );
  if (value === "partial")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-warn/10 px-2.5 py-1 text-xs font-semibold text-[#b45309]">
        <Minus size={13} aria-hidden="true" /> Partial
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-line/60 px-2.5 py-1 text-xs font-semibold text-muted">
      <X size={13} aria-hidden="true" /> No
    </span>
  );
}

export default function ResearchGap() {
  return (
    <section id="research-gap" data-nav-section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow="Domain · Research gap"
          title="Four gaps that keep requirements and tests apart."
          description="These are the areas the surveyed work leaves open. NextGen QA is designed around closing all four at once."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {gaps.map((gap, i) => {
            const Icon = icons[i % icons.length];
            const [title, rest = ""] = gap.split(": ");
            return (
              <li
                key={gap}
                className="group rounded-[24px] bg-white p-7"
              >
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-ink motion-safe:transition-[background-color,color,rotate,scale] motion-safe:duration-300 group-hover:bg-navy group-hover:text-brand motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6"
                >
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold leading-snug text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {rest.charAt(0).toUpperCase() + rest.slice(1)}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_20px_60px_-40px_rgba(14,24,42,0.35)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">Capability comparison between existing approaches and NextGen QA</caption>
              <thead>
                <tr className="border-b border-line bg-surface">
                  <th scope="col" className="px-5 py-4 font-semibold text-ink">
                    Capability
                  </th>
                  {gapColumns.map((c, i) =>
                    i === gapColumns.length - 1 ? (
                      <th key={c} scope="col" className="bg-cta px-5 py-4 text-center font-bold text-white">
                        <span className="inline-flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element -- static logo mark */}
                          <img src={asset("/logos/qa-mark.webp")} alt="" width={23} height={16} className="h-4 w-auto brightness-0 invert" />
                          {c}
                        </span>
                      </th>
                    ) : (
                      <th key={c} scope="col" className="px-5 py-4 text-center font-semibold text-muted">
                        {c}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {gapRows.map((row) => (
                  <tr key={row.capability} className="border-b border-line last:border-b-0 motion-safe:transition-colors hover:bg-surface/70">
                    <th scope="row" className="px-5 py-4 font-medium text-ink">
                      {row.capability}
                    </th>
                    {row.cells.map((cell, i) => {
                      const ours = i === row.cells.length - 1;
                      return (
                        <td key={i} className={`px-5 py-4 text-center ${ours ? "border-x-2 border-cta/30 bg-cta/8" : ""}`}>
                          <Mark value={cell} strong={ours} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
