module.exports = {
  CLIENT_ERRORS: {
    // Validação de campos
    REQUIRED_FIELD: {
      code: 422,
      status: "error",
      message: "field_name é obrigatório!",
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
  },
};
