import { BookOpen } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { literature, literatureInsight } from "@/data/domain";

export default function LiteratureSurvey() {
  return (
    <section id="literature-survey" data-nav-section className="bg-white py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow="Domain · Literature survey"
          title="What the research already knows, and where it stops."
          description="Five threads of recent work meet in this project. Each one solves a slice; the survey shows why the slices never joined up."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-[24px] border-[1.5px] border-brand/50 bg-surface p-7">
              <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-ink">
                <BookOpen size={22} />
              </span>
              <p className="mt-5 text-xl font-bold leading-snug text-ink">{literatureInsight.headline}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">{literatureInsight.text}</p>
            </div>
          </aside>

          <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {literature.map((theme, i) => (
              <li key={theme.id} className="flex flex-col rounded-[24px] border border-line bg-white p-6 transition-colors hover:border-brand">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold leading-snug text-ink">{theme.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{theme.summary}</p>
                {theme.references.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Key references">
                    {theme.references.map((r) => (
                      <li key={r} className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
