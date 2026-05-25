export interface RegisterFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface AuthResponse {
  code: number;
  status: string;
  message: string;
  token: string;
}
