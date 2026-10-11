import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { milestones } from "@/data/milestones";
import MilestonesStepper from "./MilestonesStepper";

export default function MilestonesSection() {
  return (
    <section id="milestones" data-nav-section className="bg-white py-20 md:py-24">
      <Container>
        <SectionIntro
          align="center"
          eyebrow="Milestones"
          title="Every assessment, with its date and marks."
          description="Pick a milestone from the Milestones menu or select a step below for the details of that assessment."
        />
        <div className="mx-auto max-w-6xl">
          <MilestonesStepper milestones={milestones} />
        </div>
      </Container>
    </section>
  );
}
