import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { milestones } from "@/data/milestones";
import MilestonesStepper from "./MilestonesStepper";

export default function MilestonesSection() {
  return (
    <section id="milestones" data-nav-section className="bg-white py-24 md:py-32">
      <Container>
        <SectionIntro
          eyebrow="Milestones"
          title="Every assessment, with its date and marks."
          description="Pick a milestone from the Milestones menu or select a step below for the details of that assessment."
        />
        <MilestonesStepper milestones={milestones} />
      </Container>
    </section>
  );
}
