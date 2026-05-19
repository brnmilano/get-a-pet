module.exports = {
  CLIENT_ERRORS: {
    // Validação de campos
    REQUIRED_FIELD: {
      code: 422,
      status: "error",
      message: "field_name é obrigatório!",
    },
    // Campos obrigatórios de User
    USER_NAME_REQUIRED: {
      code: 422,
      status: "error",
      message: "O nome é obrigatório!",
    },
    USER_EMAIL_REQUIRED: {
      code: 422,
      status: "error",
      message: "O email é obrigatório!",
    },
    USER_PASSWORD_REQUIRED: {
      code: 422,
      status: "error",
      message: "A senha é obrigatória!",
    },
    USER_CONFIRM_PASSWORD_REQUIRED: {
      code: 422,
      status: "error",
      message: "A confirmação de senha é obrigatória!",
    },
    USER_PHONE_REQUIRED: {
      code: 422,
      status: "error",
      message: "O telefone é obrigatório!",
    },
    // Campos obrigatórios de Pet
    PET_NAME_REQUIRED: {
      code: 422,
      status: "error",
      message: "Nome do pet é obrigatório!",
    },
    PET_AGE_REQUIRED: {
      code: 422,
      status: "error",
      message: "Idade do pet é obrigatória!",
    },
    PET_WEIGHT_REQUIRED: {
      code: 422,
      status: "error",
      message: "Peso do pet é obrigatório!",
    },
    PET_COLOR_REQUIRED: {
      code: 422,
      status: "error",
      message: "Cor do pet é obrigatória!",
    },
    PET_IMAGES_REQUIRED: {
      code: 422,
      status: "error",
      message: "As imagens são obrigatórias!",
    },
    INVALID_PET_ID: {
      code: 400,
      status: "error",
      message: "ID do pet inválido!",
    },
    PASSWORD_MISMATCH: {
      code: 422,
      status: "error",
      message: "A senha e a confirmação de senha precisam ser iguais!",
    },
    PASSWORDS_DONT_MATCH: {
      code: 422,
      status: "error",
      message: "As senhas não conferem.",
    },
    // Erros específicos
    EMAIL_EXISTS: {
      code: 422,
      status: "error",
      message: "Por favor, utilize outro email!",
    },
    EMAIL_AND_PASSWORD_REQUIRED: {
      code: 422,
      status: "error",
      message: "Email e senha são obrigatórios!",
    },
    EMAIL_NOT_REGISTERED: {
      code: 422,
      status: "error",
      message: "Não há usuário cadastrado com esse email!",
    },
    INVALID_PASSWORD: {
      code: 422,
      status: "error",
      message: "Senha inválida!",
    },
    ANOTHER_EMAIL_IN_USE: {
      code: 422,
      status: "error",
      message: "Por favor, utilize outro e-mail!",
    },
    // 404 errors
    USER_NOT_FOUND: {
      code: 404,
      status: "error",
      message: "Usuário não encontrado!",
    },
    PET_NOT_FOUND: {
      code: 404,
      status: "error",
      message: "Pet não encontrado!",
    },
  },
  SERVER_ERRORS: {
    INTERNAL: {
      code: 500,
      status: "error",
      message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
    },
  },
  SUCCESS: {
    USER_AUTHENTICATED: {
      code: 200,
      status: "success",
      message: "Usuário autenticado com sucesso!",
    },
    USER_FOUND: {
      code: 200,
      status: "success",
      message: "Usuário encontrado com sucesso!",
    },
    USER_UPDATED: {
      code: 200,
      status: "success",
      message: "Usuário atualizado com sucesso!",
    },
    PET_CREATED: {
      code: 201,
      status: "success",
      message: "Pet cadastrado com sucesso!",
    },
    PET_FOUND: {
      code: 200,
      status: "success",
      message: "Pet encontrado com sucesso!",
    },
    PETS_FOUND: {
      code: 200,
      status: "success",
      message: "Pets encontrados com sucesso!",
    },
    PET_UPDATED: {
      code: 200,
      status: "success",
      message: "Pet atualizado com sucesso!",
    },
    PET_DELETED: {
      code: 200,
      status: "success",
      message: "Pet deletado com sucesso!",
    },
  },
};
