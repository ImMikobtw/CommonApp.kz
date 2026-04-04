import { apiClient } from "../client";
import { endpoints } from "../endpoints";

export interface DashboardStats {
  universities: number;
  specialties: number;
  programs: number;
  documents: number;
  parseSessions: number;
  pendingSuggestions: number;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const { data } = await apiClient.get<DashboardStats>(endpoints.dashboard.stats);
    return data;
  },
};
