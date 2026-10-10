import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Presentations", description: "Slides from past presentations, with room for upcoming ones." };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Section" title="Presentations" description="Slides from past presentations, with room for upcoming ones." />
      <Container className="py-20">
        <p className="max-w-prose text-muted">This section is being built. Content arrives in the next phase of the build plan.</p>
      </Container>
    </>
  );
}
