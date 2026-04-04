import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../../shared/api/services/dashboard.service";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardService.getStats(),
    // Keep stats fresh for 1 minute
    staleTime: 60 * 1000,
  });
}
