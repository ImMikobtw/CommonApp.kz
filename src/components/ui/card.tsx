import { ReactNode } from "react";
import { cn } from "../../shared/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-premium border border-surface-200 bg-white p-6 shadow-premium transition-all hover:shadow-[0_10px_25px_-3px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}