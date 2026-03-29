import { apiClient } from "../client";
import { AuthResponse, MeResponse, LoginParams, RegisterParams } from "../types/auth";

export const authService = {
  async login(params: LoginParams): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", params);
    return data;
  },

  async register(params: RegisterParams): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/auth/register", params);
    return data;
  },

  async getMe(): Promise<MeResponse> {
    const { data } = await apiClient.get<MeResponse>("/auth/me");
    return data;
  },
};
