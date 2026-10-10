import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Page not found</h1>
      <p className="mx-auto mt-4 max-w-prose text-muted">
        The page you asked for does not exist on this site. Use the navigation to find what you need.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">Back to Home</ButtonLink>
      </div>
    </Container>
  );
}
