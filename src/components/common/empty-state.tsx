import { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
};

export function EmptyState({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-premium border-2 border-dashed border-surface-200 bg-white/50 px-6 py-16 text-center shadow-inner-subtle">
      {icon && <div className="mb-4 text-surface-400">{icon}</div>}
      <h2 className="text-xl font-bold tracking-tight text-surface-900">{title}</h2>

      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-surface-500">
          {description}
        </p>
      )}

      {action && <div className="mt-8 flex justify-center">{action}</div>}
    </div>
  );
}