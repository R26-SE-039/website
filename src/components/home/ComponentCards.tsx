import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { researchComponents } from "@/data/components";
import type { ComponentNo } from "@/types/content";

const colors: Record<ComponentNo, string> = {
  1: "var(--color-c1)",
  2: "var(--color-c2)",
  3: "var(--color-c3)",
  4: "var(--color-c4)",
};

export default function ComponentCards() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Four components"
          title="One platform, four research contributions"
          description="Each member owns one component; together they form the loop."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {researchComponents.map((c) => (
            <Card key={c.no} as="li" className="flex flex-col" >
              <span
                aria-hidden="true"
                className="mb-4 block h-1 w-12 rounded-full"
                style={{ backgroundColor: colors[c.no] }}
              />
              <span className="font-mono text-xs text-muted">Component {c.no}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">{c.member}</p>
              <p className="mt-4 flex-1 text-sm text-ink/80">{c.summary}</p>
              <Link
                href="/domain/#research-objectives"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
              >
                Objective <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </ul>
      </Container>
    </section>
  );
}
