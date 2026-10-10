import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Documents", description: "Documents produced so far and those still pending, as links." };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Section" title="Documents" description="Documents produced so far and those still pending, as links." />
      <Container className="py-20">
        <p className="max-w-prose text-muted">This section is being built. Content arrives in the next phase of the build plan.</p>
      </Container>
    </>
  );
}
