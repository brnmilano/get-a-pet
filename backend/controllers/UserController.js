const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const UserSchema = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    for (const [field, error] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(422).json({
          code: 422,
          status: "error",
          message: error,
        });
      }
    }

    // Validações customizadas (que não são apenas campos obrigatórios)
    if (password !== confirmPassword) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "As senhas não coincidem.",
      });
    }

    // Verifica se o Usuário já existe
    const userExists = await UserSchema.findOne({ email });

    if (userExists) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "O email já está em uso.",
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

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Usuário criado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao criar usuário.",
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "O email e a senha são obrigatórios.",
      });
    }

    // Verifica se o Usuário existe
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "O email não está cadastrado.",
      });
    }

    // Verifica se a senha bate com a do banco de dados
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "A senha está incorreta.",
      });
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);

      // Metodo verifyToken retorna o payload do token, ou seja, os dados do usuário que foram usados para criar o token, como id, name e email
      const decoded = await jwt.verify(token, "nossosecret");

      currentUser = await UserSchema.findById(decoded.id)
        .select("-password")
        .select("-confirmPassword");
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

  static async getUserById(req, res) {
    const id = req.params.id;

    try {
      const user = await UserSchema.findById(id)
        .select("-password")
        .select("-confirmPassword");

      if (!user) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Usuário não encontrado.",
        });
      }

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Usuário encontrado com sucesso!",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao buscar usuário.",
      });
    }
  }

  static async editUser(req, res) {
    const id = req.params.id;
    const { name, email, phone, password, confirmpassword } = req.body;

    const token = getToken(req);
    const user = await getUserByToken(token);

    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    // Validações de campos obrigatórios
    const requiredFields = {
      name: "O nome é obrigatório!",
      email: "O email é obrigatório!",
      phone: "O telefone é obrigatório!",
    };

    for (const [field, error] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(422).json({
          code: 422,
          status: "error",
          message: error,
        });
      }
    }

    // Validações customizadas
    const userExists = await UserSchema.findOne({ email: email });
    const customValidations = [
      {
        condition: user.email !== email && userExists,
        error: {
          code: 422,
          status: "error",
          message: "Já existe um usuário com esse email.",
        },
      },
      {
        condition: password && password !== confirmpassword,
        error: {
          code: 422,
          status: "error",
          message: "As senhas não coincidem.",
        },
      },
    ];

    for (const validation of customValidations) {
      if (validation.condition) {
        return res.status(422).json(validation.error);
      }
    }

    // Atualizar dados do usuário
    user.name = name;
    user.email = email;
    user.phone = phone;

    if (image) {
      user.image = req.file.filename;
    }

    // Alterar senha se fornecida
    if (password && password === confirmpassword) {
      const salt = await bcrypt.genSalt(12);

      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      const updatedUser = await UserSchema.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      );

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Usuário atualizado com sucesso!",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao atualizar usuário.",
      });
    }
  }

  static async deleteUser(req, res) {
    const id = req.params.id;

    const token = getToken(req);
    const user = await getUserByToken(token);

    // Verificar se o usuário que está deletando é o dono da conta
    if (user._id.toString() !== id) {
      return res.status(403).json({
        code: 403,
        status: "error",
        message: "Você não tem permissão para deletar este usuário.",
      });
    }

    try {
      const deletedUser = await UserSchema.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Usuário não encontrado.",
        });
      }

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Usuário deletado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro ao deletar usuário.",
      });
    }
  }
};
