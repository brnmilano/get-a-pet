export interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  image?: string;
  age?: string;
  weight?: string;
  color?: string;
  images?: string;
}

export type RegisterFormErros = FormErrors;

export type LoginFormErros = FormErrors;

export type ProfileFormErrors = FormErrors;

export type PetFormErrors = FormErrors;
