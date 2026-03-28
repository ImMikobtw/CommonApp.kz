import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../../../shared/api/endpoints";
import { LoginPayload, LoginResponse } from "../types/auth.types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(endpoints.auth.login, payload);
  return data;
}