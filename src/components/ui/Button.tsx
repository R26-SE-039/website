import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-brand-strong text-white hover:bg-brand",
  secondary: "border border-line bg-transparent text-ink hover:border-brand hover:bg-surface-2",
};

type LinkProps = { href: string; children: ReactNode; variant?: Variant; className?: string };

export function ButtonLink({ href, children, variant = "primary", className }: LinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({ children, variant = "primary", className, type = "button", onClick, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], "disabled:cursor-not-allowed disabled:opacity-50", className)}
    >
      {children}
    </button>
  );
}
