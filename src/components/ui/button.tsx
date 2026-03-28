import * as React from "react";
import { cn } from "../../shared/lib/cn";

type ButtonVariant = "default" | "outline" | "ghost" | "destructive" | "secondary";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export function Button({
  className,
  variant = "default",
  size = "md",
  type = "button",
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-brand-primary text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:bg-brand-primary/90 animate-shimmer",
        variant === "secondary" && "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20",
        variant === "outline" && "border border-surface-200 bg-white text-surface-900 hover:bg-surface-50 shadow-sm hover:border-brand-primary/30",
        variant === "ghost" && "text-surface-600 hover:bg-surface-100 hover:text-surface-900",
        variant === "destructive" && "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-11 px-6 text-base",
        size === "icon" && "h-10 w-10",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}