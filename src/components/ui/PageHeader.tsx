import Container from "./Container";

type Props = { eyebrow?: string; title: string; description?: string };

export default function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="border-b border-line bg-surface py-16 md:py-20">
      <Container>
        {eyebrow && <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{eyebrow}</p>}
        <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-prose text-lg text-muted">{description}</p>}
      </Container>
    </section>
  );
}
