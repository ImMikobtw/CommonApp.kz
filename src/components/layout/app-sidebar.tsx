"use client";

import { dashboardNavItems } from "../../shared/config/navigation";
import { Logo } from "../common/logo";
import { SidebarItem } from "./sidebar-item";

export function AppSidebar() {
  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-surface-200 bg-surface-50 lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-surface-200 px-6 bg-white/50 backdrop-blur-sm">
        <Logo />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8 scrollbar-hide">
        <nav className="flex flex-col gap-2">
          {dashboardNavItems.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </nav>
      </div>
      
      <div className="border-t border-surface-200/60 p-5">
        <div className="rounded-2xl border border-surface-200 bg-white/80 p-4 shadow-sm">
          <p className="text-xs font-bold text-surface-900">Need help?</p>
          <p className="mt-1 text-[11px] font-medium text-surface-400">System documentation and support resources.</p>
        </div>
      </div>
    </aside>
  );
}