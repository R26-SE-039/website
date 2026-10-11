import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";
import HeroMockup from "./HeroMockup";
import Waves from "@/components/Waves";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-surface">
      {/* Background: flow-line wave field + readability gradient (fades to the section colour). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Waves
          lineColor="rgba(14, 24, 42, 0.10)"
          backgroundColor="transparent"
          waveSpeedX={0.0125}
          waveSpeedY={0.005}
          waveAmpX={32}
          waveAmpY={16}
          xGap={12}
          yGap={34}
          friction={0.925}
          tension={0.005}
          maxCursorMove={110}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(245,249,253,0.2) 0%, rgba(245,249,253,0.75) 70%, rgb(245,249,253) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1720px] px-5 py-16 md:px-14 md:py-16">
        <div className="mx-auto max-w-[840px] text-center">
          <span className="reveal-fade inline-flex items-center gap-2 rounded-full border-[1.5px] border-line px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
            {site.heroBadge}
          </span>
          <h1 className="reveal-slide reveal-d1 mx-auto mt-7 text-[2.5rem] font-bold leading-[1.1] tracking-[-0.035em] text-ink sm:text-5xl md:text-[3.5rem]">
            {site.heroTitle}
          </h1>
          <p className="reveal-slide reveal-d2 mx-auto mt-7 max-w-[640px] text-lg leading-[1.55] text-muted">
            {site.heroDescription}
          </p>
          <div className="reveal-fade reveal-d3 mt-9 flex flex-wrap justify-center gap-3.5">
            <ButtonLink href="/#literature-survey">Explore the research</ButtonLink>
            <ButtonLink href="/#documents" variant="secondary">
              View documents <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
        <HeroMockup />
      </div>
    </section>
  );
}
