interface FormErrors {
  [key: string]: string;
}

interface RegisterFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateRegisterField = (name: string, value: string): string => {
  const trimmedValue = value.trim();

  switch (name) {
    case "name":
      if (trimmedValue === "") {
        return "O nome é obrigatório.";
      }
      break;
    case "phone":
      if (trimmedValue === "") {
        return "O telefone é obrigatório.";
      }
      break;
    case "email":
      if (trimmedValue === "") {
        return "O email é obrigatório.";
      }
      break;
    case "password":
      if (trimmedValue === "") {
        return "A senha é obrigatória.";
      }
      break;
    case "confirmPassword":
      if (trimmedValue === "") {
        return "A confirmação de senha é obrigatória.";
      }
      break;
  }

  return "";
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
    const error = validateRegisterField(field, formData[field]);
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

export const validateLoginField = (name: string, value: string): string => {
  const trimmedValue = value.trim();

  switch (name) {
    case "email":
      if (trimmedValue === "") {
        return "O email é obrigatório.";
      }
      break;
    case "password":
      if (trimmedValue === "") {
        return "A senha é obrigatória.";
      }
      break;
  }

  return "";
};

export const validateLoginForm = (formData: {
  email: string;
  password: string;
}): FormErrors => {
  const newErrors: FormErrors = {};

  // Validar cada campo
  const fieldsToValidate = ["email", "password"] as const;

  fieldsToValidate.forEach((field) => {
    const error = validateLoginField(field, formData[field]);

    if (error) {
      newErrors[field] = error;
    }
  });

  return newErrors;
};
