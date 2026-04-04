import { apiClient } from "../client";
import { endpoints } from "../endpoints";

export interface University {
  id: number;
  nameRu: string;
  nameKz: string;
  nameEn: string;
  abbrRu?: string;
  abbrKz?: string;
  abbrEn?: string;
  descriptionRu?: string;
  descriptionKz?: string;
  descriptionEn?: string;
  logo?: string;
  website?: string;
  phone?: string;
  address?: string;
  code?: string;
  services: string[];
  createdAt: string;
  updatedAt: string;
  _count?: {
    programs: number;
  };
}

export interface CreateUniversityParams {
  nameRu: string;
  nameKz: string;
  nameEn: string;
  abbrRu?: string;
  abbrKz?: string;
  abbrEn?: string;
  descriptionRu?: string;
  descriptionKz?: string;
  descriptionEn?: string;
  logo?: string;
  website?: string;
  phone?: string;
  address?: string;
  code?: string;
  services?: string[];
}

export const universityService = {
  async getAll(): Promise<University[]> {
    const { data } = await apiClient.get<University[]>(endpoints.universities.list);
    return data;
  },

  async getById(id: number): Promise<University> {
    const { data } = await apiClient.get<University>(endpoints.universities.byId(id));
    return data;
  },

  async create(params: CreateUniversityParams): Promise<University> {
    const { data } = await apiClient.post<University>(endpoints.universities.create, params);
    return data;
  },

  async update(id: number, params: Partial<CreateUniversityParams>): Promise<University> {
    const { data } = await apiClient.patch<University>(endpoints.universities.byId(id), params);
    return data;
  },

  async delete(id: number): Promise<{ deleted: boolean }> {
    const { data } = await apiClient.delete<{ deleted: boolean }>(endpoints.universities.byId(id));
    return data;
  },

  async getOptions(): Promise<Array<{ id: number; nameRu: string; nameKz: string; logo?: string }>> {
    const { data } = await apiClient.get(endpoints.universities.list + "/options");
    return data;
  },
};
