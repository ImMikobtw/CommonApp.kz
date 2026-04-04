import { apiClient } from "../client";
import { endpoints } from "../endpoints";

export enum UserRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

export interface User {
  id: number;
  email: string;
  name?: string;
  role: UserRole;
  universityId?: number;
  createdAt: string;
  university?: {
    nameRu: string;
    nameKz: string;
    logo?: string;
  };
}

export interface CreateUserParams {
  email: string;
  password?: string;
  name?: string;
  role?: UserRole;
  universityId?: number;
}

export const userService = {
  async getAll(): Promise<User[]> {
    const { data } = await apiClient.get<User[]>(endpoints.users.list);
    return data;
  },

  async getById(id: number): Promise<User> {
    const { data } = await apiClient.get<User>(endpoints.users.byId(id));
    return data;
  },

  async create(params: CreateUserParams): Promise<User> {
    const { data } = await apiClient.post<User>(endpoints.users.list, params);
    return data;
  },

  async update(id: number, params: Partial<CreateUserParams>): Promise<User> {
    const { data } = await apiClient.patch<User>(endpoints.users.byId(id), params);
    return data;
  },

  async delete(id: number): Promise<{ deleted: boolean }> {
    const { data } = await apiClient.delete<{ deleted: boolean }>(endpoints.users.byId(id));
    return data;
  },
};
