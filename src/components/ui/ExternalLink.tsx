import { ExternalLink as ExternalIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { href: string; children: ReactNode; className?: string; iconless?: boolean };

export default function ExternalLink({ href, children, className, iconless = false }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-1.5 text-brand underline-offset-4 hover:underline", className)}
    >
      {children}
      {!iconless && <ExternalIcon size={14} aria-hidden="true" />}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
