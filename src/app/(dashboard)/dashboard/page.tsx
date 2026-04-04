"use client";

import { Card } from "../../../components/ui/card";
import { PageHeader } from "../../../components/ui/page-header";
import { University, FileText, FolderKanban, GitCompareArrows } from "lucide-react";
import { useDashboardStats } from "./use-dashboard-stats";

export default function DashboardPage() {
  const { data, isLoading } = useDashboardStats();

  const stats = [
    { 
      title: "Universities", 
      value: isLoading ? "..." : data?.universities.toString() || "0", 
      icon: University, 
      color: "text-indigo-600", 
      bg: "bg-indigo-50" 
    },
    { 
      title: "Specialties", 
      value: isLoading ? "..." : data?.specialties.toString() || "0", 
      icon: FolderKanban, 
      color: "text-blue-600", 
      bg: "bg-blue-50" 
    },
    { 
      title: "Programs", 
      value: isLoading ? "..." : data?.programs.toString() || "0", 
      icon: GitCompareArrows, 
      color: "text-violet-600", 
      bg: "bg-violet-50" 
    },
    { 
      title: "Documents", 
      value: isLoading ? "..." : data?.documents.toString() || "0", 
      icon: FileText, 
      color: "text-sky-600", 
      bg: "bg-sky-50" 
    },
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        title="Dashboard"
        description="Overview of Common App admin activity and system health."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="relative overflow-hidden group border-surface-200/60 ring-1 ring-surface-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-surface-400 uppercase tracking-widest">{card.title}</p>
                  <p className="mt-2 text-4xl font-black text-surface-900 tracking-tight">
                    {card.value}
                  </p>
                </div>
                <div className={`rounded-2xl ${card.bg} p-3 transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest opacity-80">Live updates</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}