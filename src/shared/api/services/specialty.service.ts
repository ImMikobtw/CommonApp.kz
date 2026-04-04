import { apiClient } from "../client";
import { endpoints } from "../endpoints";

export interface Specialty {
  id: number;
  code: string;
  nameRu: string;
  nameKz: string;
  nameEn: string;
  descriptionRu?: string;
  descriptionKz?: string;
  descriptionEn?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    programs: number;
  };
}

export interface CreateSpecialtyParams {
  code: string;
  nameRu: string;
  nameKz: string;
  nameEn: string;
  descriptionRu?: string;
  descriptionKz?: string;
  descriptionEn?: string;
}

export const specialtyService = {
  async getAll(): Promise<Specialty[]> {
    const { data } = await apiClient.get<Specialty[]>(endpoints.specialties.list);
    return data;
  },

  async getById(id: number): Promise<Specialty> {
    const { data } = await apiClient.get<Specialty>(endpoints.specialties.byId(id));
    return data;
  },

  async create(params: CreateSpecialtyParams): Promise<Specialty> {
    const { data } = await apiClient.post<Specialty>(endpoints.specialties.create, params);
    return data;
  },

  async update(id: number, params: Partial<CreateSpecialtyParams>): Promise<Specialty> {
    const { data } = await apiClient.patch<Specialty>(endpoints.specialties.byId(id), params);
    return data;
  },

  async delete(id: number): Promise<{ deleted: boolean }> {
    const { data } = await apiClient.delete<{ deleted: boolean }>(endpoints.specialties.byId(id));
    return data;
  },

  async getOptions(): Promise<Array<{ id: number; code: string; nameRu: string; nameKz: string }>> {
    const { data } = await apiClient.get(endpoints.specialties.list + "/options");
    return data;
  },
};
