import AboutSection from "@/components/home/AboutSection";
import ComponentCards from "@/components/home/ComponentCards";
import ContactSection from "@/components/home/ContactSection";
import DocumentsSection from "@/components/home/DocumentsSection";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import LiteratureSurvey from "@/components/home/LiteratureSurvey";
import Methodology from "@/components/home/Methodology";
import MilestonesSection from "@/components/home/MilestonesSection";
import Objectives from "@/components/home/Objectives";
import ResearchGap from "@/components/home/ResearchGap";
import ResearchProblem from "@/components/home/ResearchProblem";
import TechGrid from "@/components/home/TechGrid";
import TechMarquee from "@/components/home/TechMarquee";
import BrandSprite from "@/components/ui/BrandSprite";

/** One-page site: every required section lives here and the navbar jumps to its anchor. */
export default function HomePage() {
  return (
    <>
      <BrandSprite />
      <div id="top" data-nav-section>
        <Hero />
        <Highlights />
        <TechMarquee />
        <ComponentCards />
      </div>
      <LiteratureSurvey />
      <ResearchGap />
      <ResearchProblem />
      <Objectives />
      <Methodology />
      <TechGrid />
      <MilestonesSection />
      <DocumentsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
