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

const mapSpecialty = (data: any): Specialty => ({
  id: data.id,
  code: data.code,
  nameRu: data.name_ru,
  nameKz: data.name_kz,
  nameEn: data.name_en,
  descriptionRu: data.description_ru,
  descriptionKz: data.description_kz,
  descriptionEn: data.description_en,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
  ...data,
});

const mapToBackend = (params: any) => ({
  code: params.code,
  name_ru: params.nameRu,
  name_kz: params.nameKz,
  name_en: params.nameEn,
  description_ru: params.descriptionRu,
  description_kz: params.descriptionKz,
  description_en: params.descriptionEn,
});

export const specialtyService = {
  async getAll(): Promise<Specialty[]> {
    const { data } = await apiClient.get<any[]>(endpoints.specialties.list);
    return data.map(mapSpecialty);
  },

  async getById(id: number): Promise<Specialty> {
    const { data } = await apiClient.get<any>(endpoints.specialties.byId(id));
    return mapSpecialty(data);
  },

  async create(params: CreateSpecialtyParams): Promise<Specialty> {
    const payload = mapToBackend(params);
    const { data } = await apiClient.post<any>(endpoints.specialties.create, payload);
    return mapSpecialty(data);
  },

  async update(id: number, params: Partial<CreateSpecialtyParams>): Promise<Specialty> {
    const payload = mapToBackend(params);
    Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);
    const { data } = await apiClient.patch<any>(endpoints.specialties.byId(id), payload);
    return mapSpecialty(data);
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
