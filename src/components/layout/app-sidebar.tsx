"use client";

import { dashboardNavItems } from "../../shared/config/navigation";
import { Logo } from "../common/logo";
import { SidebarItem } from "./sidebar-item";

export function AppSidebar() {
  return (
    <aside className="hidden w-[260px] shrink-0 border-r border-zinc-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-zinc-200 px-5 py-4">
        <Logo />
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="flex flex-col gap-1">
          {dashboardNavItems.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  );
}