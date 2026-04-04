export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  name?: string;
  full_name?: string;
  email: string;
  password: string;
  role?: string;
}

export interface User {
  id: number;
  name?: string;
  full_name: string;
  email: string;
  role: string;
  status?: string;
  phone?: string | null;
  universityId?: number | null;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface MeResponse {
  user: User;
}
