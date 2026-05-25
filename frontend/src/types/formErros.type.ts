export interface RegisterFormErros {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoginFormErros {
  email?: string;
  password?: string;
}
