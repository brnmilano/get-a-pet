import type { RegisterFormData } from "../types/auth.types";
import type { FormErrors } from "../types/formErros.type";

/* Validações reutilizáveis por campo */
const fieldValidations: {
  [key: string]: (value: string) => string;
} = {
  name: (value: string) => (value.trim() === "" ? "O nome é obrigatório." : ""),
  phone: (value: string) =>
    value.trim() === "" ? "O telefone é obrigatório." : "",
  email: (value: string) =>
    value.trim() === "" ? "O email é obrigatório." : "",
  password: (value: string) =>
    value.trim() === "" ? "A senha é obrigatória." : "",
  confirmPassword: (value: string) =>
    value.trim() === "" ? "A confirmação de senha é obrigatória." : "",
};

/* Função genérica para validar um campo */
export const validateField = (name: string, value: string): string => {
  return fieldValidations[name]?.(value) ?? "";
};

export const validateFields = (name: string, value: string): string => {
  return validateField(name, value);
};

export const validateRegisterForm = (
  formData: RegisterFormData,
): FormErrors => {
  const newErrors: FormErrors = {};

  // Validar cada campo
  const fieldsToValidate = [
    "name",
    "phone",
    "email",
    "password",
    "confirmPassword",
  ] as const;

  fieldsToValidate.forEach((field) => {
    const error = validateField(field, formData[field]);

    if (error) {
      newErrors[field] = error;
    }
  });

  // Validar se as senhas coincidem
  const trimmedPassword = formData.password.trim();
  const trimmedConfirmPassword = formData.confirmPassword.trim();

  if (
    trimmedPassword !== trimmedConfirmPassword &&
    trimmedPassword !== "" &&
    trimmedConfirmPassword !== ""
  ) {
    newErrors.confirmPassword = "As senhas não coincidem.";
  }

  return newErrors;
};

export const validateLoginForm = (formData: {
  email: string;
  password: string;
}): FormErrors => {
  const newErrors: FormErrors = {};

  // Validar cada campo
  const fieldsToValidate = ["email", "password"] as const;

  fieldsToValidate.forEach((field) => {
    const error = validateField(field, formData[field]);

    if (error) {
      newErrors[field] = error;
    }
  });

  return newErrors;
};
