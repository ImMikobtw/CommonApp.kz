import { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-surface-50 text-surface-900">
      {/* Subtle Mesh Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-surface-200 blur-[120px]" />
      </div>

      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader />

          <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}