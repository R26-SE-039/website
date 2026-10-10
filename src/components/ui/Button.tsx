import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "navy";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold transition-all duration-200";

const variants: Record<Variant, string> = {
  // Cyan fill with navy text: 8.4:1 contrast.
  primary: "bg-brand text-brand-ink hover:brightness-95 hover:-translate-y-px",
  secondary: "border-[1.5px] border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
  navy: "bg-navy text-white hover:bg-[#1b2a44]",
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
