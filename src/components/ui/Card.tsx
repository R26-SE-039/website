import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { children: ReactNode; className?: string; as?: "div" | "article" | "li" };

export default function Card({ children, className, as: Tag = "div" }: Props) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-line bg-white p-6 transition-colors duration-200 hover:border-brand hover:bg-surface",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
