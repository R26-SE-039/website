import { Check, Compass, Minus, ScanSearch, ShieldOff, TrendingDown, X } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { gapColumns, gapRows, gaps } from "@/data/domain";
import type { GapMark } from "@/types/content";

const icons = [ScanSearch, Compass, ShieldOff, TrendingDown];

function Mark({ value }: { value: GapMark }) {
  if (value === "yes")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-pass/10 px-2.5 py-1 text-xs font-semibold text-[#15803d]">
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
            const [title, rest] = gap.split(": ");
            return (
              <li key={gap} className="rounded-[24px] bg-white p-7">
                <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-ink">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{rest}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 overflow-hidden rounded-[24px] border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">Capability comparison between existing approaches and NextGen QA</caption>
              <thead>
                <tr className="border-b border-line bg-surface">
                  <th scope="col" className="px-5 py-4 font-semibold text-ink">
                    Capability
                  </th>
                  {gapColumns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`px-5 py-4 font-semibold ${i === gapColumns.length - 1 ? "text-ink" : "text-muted"}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gapRows.map((row) => (
                  <tr key={row.capability} className="border-b border-line last:border-b-0">
                    <th scope="row" className="px-5 py-4 font-medium text-ink">
                      {row.capability}
                    </th>
                    {row.cells.map((cell, i) => (
                      <td key={i} className={`px-5 py-4 ${i === row.cells.length - 1 ? "bg-brand/5" : ""}`}>
                        <Mark value={cell} />
                      </td>
                    ))}
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
