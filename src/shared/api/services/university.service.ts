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

const mapUniversity = (data: any): University => ({
  id: data.id,
  nameRu: data.name_ru,
  nameKz: data.name_kz,
  nameEn: data.name_en,
  abbrRu: data.short_name_ru,
  abbrKz: data.short_name_kz,
  abbrEn: data.short_name_en,
  descriptionRu: data.description_ru,
  descriptionKz: data.description_kz,
  descriptionEn: data.description_en,
  logo: data.logo_url,
  website: data.website,
  phone: data.phone,
  address: data.address,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
  ...data, // Keep anything else intact
});

const mapToBackend = (params: any) => ({
  name_ru: params.nameRu,
  name_kz: params.nameKz,
  name_en: params.nameEn,
  short_name_ru: params.abbrRu,
  short_name_kz: params.abbrKz,
  short_name_en: params.abbrEn,
  description_ru: params.descriptionRu,
  description_kz: params.descriptionKz,
  description_en: params.descriptionEn,
  logo_url: params.logo,
  website: params.website,
  phone: params.phone,
  address: params.address,
  code: params.code,
  services: params.services,
});

export const universityService = {
  async getAll(): Promise<University[]> {
    const { data } = await apiClient.get<any[]>(endpoints.universities.list);
    return data.map(mapUniversity);
  },

  async getById(id: number): Promise<University> {
    const { data } = await apiClient.get<any>(endpoints.universities.byId(id));
    return mapUniversity(data);
  },

  async create(params: CreateUniversityParams): Promise<University> {
    const payload = mapToBackend(params);
    const { data } = await apiClient.post<any>(endpoints.universities.create, payload);
    return mapUniversity(data);
  },

  async update(id: number, params: Partial<CreateUniversityParams>): Promise<University> {
    const payload = mapToBackend(params);
    // Remove undefined fields
    Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);
    const { data } = await apiClient.patch<any>(endpoints.universities.byId(id), payload);
    return mapUniversity(data);
  },

  async delete(id: number): Promise<{ deleted: boolean }> {
    const { data } = await apiClient.delete<{ deleted: boolean }>(endpoints.universities.byId(id));
    return data;
  },

  async getOptions(): Promise<Array<{ id: number; nameRu: string; nameKz: string; logo?: string }>> {
    const { data } = await apiClient.get<any[]>(endpoints.universities.list + "/options");
    return data.map((item) => ({
      id: item.id,
      nameRu: item.name_ru,
      nameKz: item.name_kz,
      logo: item.logo_url,
    }));
  },

  async getSpecialties(id: number): Promise<Array<{ id: number; code: string; nameRu: string }>> {
    const { data } = await apiClient.get<any[]>(`${endpoints.universities.byId(id)}/specialties`);
    return data;
  },

  async linkSpecialty(universityId: number, specialtyId: number): Promise<void> {
    await apiClient.post(`${endpoints.universities.byId(universityId)}/specialties/${specialtyId}`);
  },

  async unlinkSpecialty(universityId: number, specialtyId: number): Promise<void> {
    await apiClient.delete(`${endpoints.universities.byId(universityId)}/specialties/${specialtyId}`);
  },
};
