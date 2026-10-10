import { Clapperboard } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { problemNarrative, researchProblem, solutionNarrative } from "@/data/domain";
import { site } from "@/data/site";
import type { ComponentNo } from "@/types/content";
import VideoFacade from "./VideoFacade";

const colors: Record<ComponentNo, string> = {
  1: "var(--color-c1)",
  2: "var(--color-c2)",
  3: "var(--color-c3)",
  4: "var(--color-c4)",
};

export default function ResearchProblem() {
  return (
    <section id="research-problem" data-nav-section className="bg-white py-24 md:py-32">
      <Container>
        <SectionIntro eyebrow="Domain · Research problem & solution" title="The problem we set out to solve, and the loop that solves it." />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h3 className="text-xl font-bold text-ink">Proposed problem</h3>
            <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-muted">
              {problemNarrative.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-8 rounded-[24px] border-l-4 border-brand bg-surface px-6 py-5 text-lg font-semibold leading-snug text-ink">
              {researchProblem.main}
            </blockquote>
          </div>

          <div className="lg:col-span-6">
            {site.introVideo.youtubeId ? (
              <VideoFacade youtubeId={site.introVideo.youtubeId} title={site.introVideo.title} />
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-line bg-surface text-center">
                <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-muted">
                  <Clapperboard size={22} />
                </span>
                <p className="text-sm font-semibold text-ink">{site.introVideo.title}</p>
                <p className="text-xs text-muted">Coming soon</p>
              </div>
            )}
            <p className="mt-3 text-xs text-muted">Product introduction — solution overview</p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold text-ink">Proposed solution</h3>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            {solutionNarrative.map((p) => (
              <p key={p.slice(0, 24)} className="text-[17px] leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {researchProblem.perComponent.map((q) => (
              <li key={q.no} className="rounded-[24px] border border-line bg-white p-6" style={{ borderTopColor: colors[q.no], borderTopWidth: 3 }}>
                <p className="font-mono text-xs text-muted">Research question · Component {q.no}</p>
                <p className="mt-2 text-[15px] font-medium leading-relaxed text-ink">{q.question}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
