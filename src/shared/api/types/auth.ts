export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  full_name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  status: string;
  phone?: string | null;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface MeResponse {
  user: User;
}
