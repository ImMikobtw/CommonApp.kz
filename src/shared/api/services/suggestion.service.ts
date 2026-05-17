import { apiClient } from "../client";
import { endpoints } from "../endpoints";

export interface Suggestion {
  id: number;
  parseSessionId: number;
  entityType: "UNIVERSITY" | "SPECIALTY" | "EDUCATIONAL_PROGRAM" | "ADMISSION_REQUIREMENT" | "FAQ";
  actionType: "CREATE" | "UPDATE" | "MERGE";
  payloadJson: any;
  confidenceScore: number;
  status: "PENDING_REVIEW" | "APPROVED" | "REJECTED" | "APPLIED";
  reviewedByUserId?: number;
  reviewedAt?: string;
  createdAt: string;
}

export const suggestionService = {
  async getAll(status?: string): Promise<Suggestion[]> {
    const { data } = await apiClient.get<Suggestion[]>(endpoints.suggestions.list, {
      params: { status },
    });
    return data;
  },

  async approve(id: number): Promise<any> {
    const { data } = await apiClient.post<any>(endpoints.suggestions.approve(id));
    return data;
  },

  async reject(id: number): Promise<any> {
    const { data } = await apiClient.post<any>(endpoints.suggestions.reject(id));
    return data;
  },
};
