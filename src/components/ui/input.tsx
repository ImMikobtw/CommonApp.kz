import * as React from "react";
import { cn } from "../../shared/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-surface-200 bg-white px-4 py-2 text-sm outline-none transition-all placeholder:text-surface-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 disabled:cursor-not-allowed disabled:bg-surface-50 disabled:opacity-50 shadow-inner-subtle",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";