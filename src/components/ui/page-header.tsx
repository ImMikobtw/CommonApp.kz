import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-sm font-medium text-surface-500 max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex shrink-0 items-center gap-3">{action}</div>}
    </div>
  );
}