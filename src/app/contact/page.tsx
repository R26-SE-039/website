import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Contact Us", description: "How to reach the group and an email template." };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Section" title="Contact Us" description="How to reach the group and an email template." />
      <Container className="py-20">
        <p className="max-w-prose text-muted">This section is being built. Content arrives in the next phase of the build plan.</p>
      </Container>
    </>
  );
}
