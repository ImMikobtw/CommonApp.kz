"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "../../shared/config/navigation";
import { cn } from "../../shared/lib/cn";

type Props = {
  item: NavItem;
};

export function SidebarItem({ item }: Props) {
  const pathname = usePathname();
  
  const isActive = item.href === "/dashboard" 
    ? pathname === "/dashboard"
    : pathname.startsWith(item.href);

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-300",
        isActive
          ? "bg-white text-brand-primary shadow-[0_4px_12px_rgba(79,70,229,0.1),0_1px_2px_rgba(79,70,229,0.06)]"
          : "text-surface-500 hover:bg-surface-200/50 hover:text-surface-900"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-brand-primary" />
      )}

      <Icon 
        className={cn(
          "h-4.5 w-4.5 shrink-0 transition-all duration-300", 
          isActive 
            ? "text-brand-primary scale-110" 
            : "text-surface-400 group-hover:text-surface-900 group-hover:scale-110"
        )} 
      />
      
      <span className={cn("transition-all", isActive ? "translate-x-0.5" : "group-hover:translate-x-0.5")}>
        {item.title}
      </span>
    </Link>
  );
}