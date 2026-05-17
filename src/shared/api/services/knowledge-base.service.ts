import { apiClient } from "../client";
import { endpoints } from "../endpoints";

export interface KnowledgeBaseEntry {
  id: number;
  universityId: number;
  sourceDocumentId?: number;
  title: string;
  content: string;
  sourceType: "MANUAL" | "DOCUMENT" | "FAQ";
  language: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  embeddingStatus: "PENDING" | "GENERATED" | "FAILED";
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeBaseCreateDto {
  universityId: number;
  title: string;
  content: string;
  language?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export interface KnowledgeBaseUpdateDto {
  title?: string;
  content?: string;
  language?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export const knowledgeBaseService = {
  async getAll(filters?: {
    universityId?: number;
    sourceType?: string;
    status?: string;
    search?: string;
  }): Promise<KnowledgeBaseEntry[]> {
    const { data } = await apiClient.get<KnowledgeBaseEntry[]>(endpoints.knowledgeBase.list, {
      params: filters,
    });
    return data;
  },

  async create(dto: KnowledgeBaseCreateDto): Promise<KnowledgeBaseEntry> {
    const { data } = await apiClient.post<KnowledgeBaseEntry>(endpoints.knowledgeBase.create, dto);
    return data;
  },

  async update(id: number, dto: KnowledgeBaseUpdateDto): Promise<KnowledgeBaseEntry> {
    const { data } = await apiClient.put<KnowledgeBaseEntry>(endpoints.knowledgeBase.byId(id), dto);
    return data;
  },

  async delete(id: number): Promise<any> {
    const { data } = await apiClient.delete<any>(endpoints.knowledgeBase.byId(id));
    return data;
  },

  async triggerEmbedding(id: number): Promise<KnowledgeBaseEntry> {
    const { data } = await apiClient.post<KnowledgeBaseEntry>(endpoints.knowledgeBase.embed(id));
    return data;
  },
};
