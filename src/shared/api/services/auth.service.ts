import { apiClient } from "../client";
import { endpoints } from "../endpoints";
import { AuthResponse, MeResponse, LoginParams, RegisterParams } from "../types/auth";

export const authService = {
  async login(params: LoginParams): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(endpoints.auth.login, params);
    return data;
  },

  async register(params: RegisterParams): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(endpoints.auth.register, params);
    return data;
  },

  async getMe(): Promise<MeResponse> {
    const { data } = await apiClient.get<MeResponse>(endpoints.auth.me);
    return data;
  },
};
