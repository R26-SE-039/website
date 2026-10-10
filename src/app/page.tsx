import ComponentCards from "@/components/home/ComponentCards";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import LoopDiagram from "@/components/home/LoopDiagram";
import NextMilestone from "@/components/home/NextMilestone";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LoopDiagram />
      <ComponentCards />
      <Highlights />
      <NextMilestone />
    </>
  );
}
