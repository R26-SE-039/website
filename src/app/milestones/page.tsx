import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Milestones", description: "Every assessment with its details, date and allocated marks." };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Section" title="Milestones" description="Every assessment with its details, date and allocated marks." />
      <Container className="py-20">
        <p className="max-w-prose text-muted">This section is being built. Content arrives in the next phase of the build plan.</p>
      </Container>
    </>
  );
}
