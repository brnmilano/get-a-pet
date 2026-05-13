const createUserToken = require("../helpers/create-user-token");
const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmPassword, phone } = req.body;

    const requiredFields = {
      name: "O nome é obrigatório!",
      email: "O email é obrigatório!",
      password: "A senha é obrigatória!",
      confirmPassword: "A confirmação de senha é obrigatória!",
      phone: "O telefone é obrigatório!",
    };

    // Valida os campos obrigatórios
    for (const [field, message] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(422).json({
          code: 422,
          status: "error",
          message: message,
        });
      }
    }

    // Validações customizadas (que não são apenas campos obrigatórios)
    const customValidations = [
      {
        condition: password !== confirmPassword,
        message: "A senha e a confirmação de senha precisam ser iguais!",
      },
    ];

    for (const validation of customValidations) {
      if (validation.condition) {
        return res.status(422).json({
          code: 422,
          status: "error",
          message: validation.message,
        });
      }
    }

    // Verifica se o Usuário já existe
    const userExists = await UserSchema.findOne({ email });

    if (userExists) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "Por favor, utilize outro email!",
      });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new UserSchema({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
      confirmPassword: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: `Ocorreu um erro no servidor, tente novamente mais tarde! Detalhes do erro: ${error.message}`,
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "Email e senha são obrigatórios!",
      });
    }

    // Verifica se o Usuário existe
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "Não há usuário cadastrado com esse email!",
      });
    }

    // Verifica se a senha bate com a do banco de dados
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "Senha inválida!",
      });
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    console.log("Token:", req.headers.authorization);

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
    } else {
      currentUser = null;
    }

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Usuário autenticado com sucesso!",
      currentUser,
    });
  }
};
