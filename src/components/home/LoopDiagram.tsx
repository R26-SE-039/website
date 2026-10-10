import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type Node = { label: string; sub: string; color: string };

const nodes: Node[] = [
  { label: "Meeting speech", sub: "Sprint conversation", color: "var(--color-muted)" },
  { label: "User stories", sub: "Component 1", color: "var(--color-c1)" },
  { label: "Gherkin & test code", sub: "Component 2", color: "var(--color-c2)" },
  { label: "Execution", sub: "Component 2", color: "var(--color-c2)" },
  { label: "Failure analysis & self-healing", sub: "Component 3", color: "var(--color-c3)" },
  { label: "Traceability & quality prediction", sub: "Component 4", color: "var(--color-c4)" },
];

export default function LoopDiagram() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="The closed loop"
          title="From a spoken requirement to a traceable, self-healing test"
          description="Each stage hands structured data to the next, and the results flow back to the start so the loop keeps improving."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6" aria-label="Pipeline stages">
          {nodes.map((n, i) => (
            <li
              key={n.label}
              className="relative rounded-2xl border border-line bg-surface p-5"
              style={{ borderTopColor: n.color, borderTopWidth: 3 }}
            >
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <p className="mt-2 text-sm font-semibold text-ink">{n.label}</p>
              <p className="mt-1 text-xs text-muted">{n.sub}</p>
              {i < nodes.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden h-px w-4 bg-line lg:block"
                />
              )}
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
          Execution results return to story generation and traceability, closing the loop.
        </p>
      </Container>
    </section>
  );
}
