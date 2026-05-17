import { apiClient } from "../client";
import { endpoints } from "../endpoints";

export interface ParseSession {
  id: number;
  documentId: number;
  status: "PENDING" | "RUNNING" | "DONE" | "FAILED";
  startedAt?: string;
  finishedAt?: string;
  rawExtractedText?: string;
  structuredJson?: any;
  summary?: string;
  confidenceScore?: number;
  errorMessage?: string;
  createdAt: string;
}

export const parseSessionService = {
  async getAll(): Promise<ParseSession[]> {
    const { data } = await apiClient.get<ParseSession[]>(endpoints.parseSessions.list);
    return data;
  },

  async trigger(documentId: number): Promise<any> {
    const { data } = await apiClient.post<any>(endpoints.parseSessions.trigger(documentId));
    return data;
  },
};
