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
  const isActive = pathname === item.href;

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-black text-white"
          : "text-zinc-700 hover:bg-zinc-100 hover:text-black"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{item.title}</span>
    </Link>
  );
}