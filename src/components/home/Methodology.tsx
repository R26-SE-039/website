import { ArrowDown, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { methodology } from "@/data/domain";

type Box = { label: string; sub: string; tone?: "c1" | "c2" | "c3" | "c4" | "navy" | "plain" };

const toneClass: Record<NonNullable<Box["tone"]>, string> = {
  c1: "border-t-4 border-t-c1",
  c2: "border-t-4 border-t-c2",
  c3: "border-t-4 border-t-c3",
  c4: "border-t-4 border-t-c4",
  navy: "bg-navy text-white border-navy",
  plain: "",
};

function BoxEl({ box }: { box: Box }) {
  const tone = box.tone ?? "plain";
  return (
    <div className={`rounded-2xl border border-line bg-white px-4 py-3 text-center ${toneClass[tone]}`}>
      <p className={`text-sm font-bold ${tone === "navy" ? "text-white" : "text-ink"}`}>{box.label}</p>
      <p className={`mt-0.5 text-xs ${tone === "navy" ? "text-on-navy-muted" : "text-muted"}`}>{box.sub}</p>
    </div>
  );
}

const clients: Box[] = [{ label: "QA engineer / team", sub: "React dashboard on Vercel" }];
const edge: Box[] = [{ label: "Caddy + API gateway", sub: "HTTPS, JWT, prefix routing", tone: "navy" }];
const services: Box[] = [
  { label: "C1 Story service", sub: "Speech → user stories", tone: "c1" },
  { label: "C2 Test generation", sub: "Gherkin · code · agent · validation · execution", tone: "c2" },
  { label: "C3 Failure analysis", sub: "Root cause · self-healing · repair agent", tone: "c3" },
  { label: "C4 Traceability", sub: "Live RTM · quality prediction", tone: "c4" },
];
const backing: Box[] = [
  { label: "PostgreSQL (Neon)", sub: "one database per service" },
  { label: "LLM providers", sub: "OpenAI · Claude · Gemini · Ollama" },
  { label: "GitHub", sub: "Actions runs · repair PRs" },
  { label: "Target application", sub: "e.g. SauceDemo staging" },
];

export default function Methodology() {
  return (
    <section id="methodology" data-nav-section className="bg-white py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow="Domain · Methodology"
          title="Design Science Research, delivered as four services in one loop."
          description="The artefact is the platform itself. Each cycle designed, built, demonstrated and evaluated a slice of it on the SauceDemo benchmark."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Architecture figure (HTML, responsive) */}
          <figure className="lg:col-span-7">
            <div className="rounded-[24px] border border-line bg-surface p-5 md:p-7">
              <div className="mx-auto max-w-sm">
                <BoxEl box={clients[0]} />
              </div>
              <div className="my-3 flex justify-center text-muted">
                <ArrowDown size={18} aria-hidden="true" />
              </div>
              <div className="mx-auto max-w-sm">
                <BoxEl box={edge[0]} />
              </div>
              <div className="my-3 flex justify-center text-muted">
                <ArrowDown size={18} aria-hidden="true" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {services.map((b) => (
                  <BoxEl key={b.label} box={b} />
                ))}
              </div>
              <div className="my-3 flex items-center justify-center gap-2 text-xs text-muted">
                <ArrowRight size={14} aria-hidden="true" />
                C2 feeds failed runs and selectors to C3, traceability to C4; results return to C1 and C2
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {backing.map((b) => (
                  <BoxEl key={b.label} box={b} />
                ))}
              </div>
            </div>
            <figcaption className="mt-3 text-xs text-muted">Figure 1. High-level architecture of NextGen QA.</figcaption>
          </figure>

          <div className="lg:col-span-5">
            <p className="text-[17px] leading-relaxed text-muted">
              The project follows <span className="font-semibold text-ink">{methodology.name}</span>: the platform is the artefact, and each
              step below produced evidence for the next.
            </p>
            <ol className="mt-8 space-y-4">
              {methodology.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span aria-hidden="true" className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand/15 font-mono text-xs font-bold text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-ink">{s.title}</p>
                    <p className="mt-0.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
