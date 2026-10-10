import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { children: ReactNode; className?: string; narrow?: boolean };

/** Full-width page container (1720 px cap, like product sites); `narrow` caps at 1152 px for text-heavy pages. */
export default function Container({ children, className, narrow = false }: Props) {
  return (
    <div className={cn("mx-auto w-full px-5 md:px-14", narrow ? "max-w-6xl" : "max-w-[1720px]", className)}>
      {children}
    </div>
  );
}
