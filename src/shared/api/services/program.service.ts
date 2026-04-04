import { apiClient } from "../client";
import { endpoints } from "../endpoints";

export interface Program {
  id: number;
  nameRu: string;
  nameKz: string;
  nameEn: string;
  universityId: number;
  specialtyId: number;
  grantCount: number;
  minPoints: number;
  degree?: string;
  languages: string[];
  createdAt: string;
  updatedAt: string;
  university?: {
    nameRu: string;
    nameKz: string;
    nameEn: string;
    logo?: string;
  };
  specialty?: {
    nameRu: string;
    nameKz: string;
    nameEn: string;
    code: string;
  };
}

export interface CreateProgramParams {
  nameRu: string;
  nameKz: string;
  nameEn: string;
  universityId: number;
  specialtyId: number;
  grantCount?: number;
  minPoints?: number;
  degree?: string;
  languages?: string[];
}

export const programService = {
  async getAll(): Promise<Program[]> {
    const { data } = await apiClient.get<Program[]>(endpoints.programs.list);
    return data;
  },

  async getById(id: number): Promise<Program> {
    const { data } = await apiClient.get<Program>(endpoints.programs.byId(id));
    return data;
  },

  async create(params: CreateProgramParams): Promise<Program> {
    const { data } = await apiClient.post<Program>(endpoints.programs.create, params);
    return data;
  },

  async update(id: number, params: Partial<CreateProgramParams>): Promise<Program> {
    const { data } = await apiClient.patch<Program>(endpoints.programs.byId(id), params);
    return data;
  },

  async delete(id: number): Promise<{ deleted: boolean }> {
    const { data } = await apiClient.delete<{ deleted: boolean }>(endpoints.programs.byId(id));
    return data;
  },
};
