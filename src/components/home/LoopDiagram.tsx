import type { CSSProperties } from "react";
import { Code2, FileText, Mic, Network, Play, Wrench, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type Node = { label: string; sub: string; icon: LucideIcon };

const nodes: Node[] = [
  { label: "Meeting speech", sub: "Sprint conversation", icon: Mic },
  { label: "User stories", sub: "Component 1", icon: FileText },
  { label: "Gherkin & test code", sub: "Component 2", icon: Code2 },
  { label: "Execution", sub: "Component 2", icon: Play },
  { label: "Failure analysis & self-healing", sub: "Component 3", icon: Wrench },
  { label: "Traceability & quality prediction", sub: "Component 4", icon: Network },
];

/*
  One accent colour (brand). Below md the cards are sticky with a growing top
  offset, so scrolling stacks them one over another; from md up they sit in a grid.
*/
export default function LoopDiagram() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="The closed loop"
          title="From a spoken requirement to a traceable, self-healing test."
          description="Each stage hands structured data to the next, and the results flow back to the start so the loop keeps improving."
        />
        <ol
          className="mt-14 flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-6"
          aria-label="Pipeline stages"
        >
          {nodes.map((n, i) => {
            const Icon = n.icon;
            return (
              <li
                key={n.label}
                style={{ "--stack-top": `${5 + i * 0.75}rem` } as CSSProperties}
                className="group relative flex min-h-44 flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[0_-8px_24px_-12px_rgba(14,24,42,0.18)] max-md:sticky max-md:top-(--stack-top) md:min-h-0 md:shadow-none motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-300 hover:border-brand/60 hover:shadow-[0_18px_40px_-20px_rgba(14,24,42,0.35)] md:motion-safe:hover:-translate-y-1.5"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] bg-ink/15"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-line bg-white text-ink motion-safe:transition-colors motion-safe:duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-ink">
                    <Icon className="size-5 motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-110" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-muted motion-safe:transition-colors group-hover:text-ink">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-auto pt-6 text-sm font-semibold text-ink">{n.label}</p>
                <p className="mt-1 text-xs text-muted">{n.sub}</p>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted">
          <span aria-hidden="true" className="inline-block h-0.5 w-8 rounded-full bg-brand" />
          Execution results return to story generation and traceability, closing the loop.
        </p>
      </Container>
    </section>
  );
}
