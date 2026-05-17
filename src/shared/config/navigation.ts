import {
  LayoutDashboard,
  University,
  FileText,
  GitCompareArrows,
  BookOpen,
  Users,
  ScrollText,
  FolderKanban,
  GraduationCap,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const dashboardNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Universities",
    href: "/universities",
    icon: University,
  },
  {
    title: "Specialties",
    href: "/specialties",
    icon: BookOpen,
  },
  {
    title: "Programs",
    href: "/programs",
    icon: GraduationCap,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Suggestions",
    href: "/requirements",
    icon: ScrollText,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Parse Sessions",
    href: "/parse-sessions",
    icon: FolderKanban,
  },
  {
    title: "Suggestions",
    href: "/suggestions",
    icon: GitCompareArrows,
  },
  {
    title: "Knowledge Base",
    href: "/knowledge-base",
    icon: BookOpen,
  },
];