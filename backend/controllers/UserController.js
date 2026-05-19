const httpErrors = require("../constants/httpErrors");
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
      name: httpErrors.CLIENT_ERRORS.USER_NAME_REQUIRED,
      email: httpErrors.CLIENT_ERRORS.USER_EMAIL_REQUIRED,
      password: httpErrors.CLIENT_ERRORS.USER_PASSWORD_REQUIRED,
      confirmPassword: httpErrors.CLIENT_ERRORS.USER_CONFIRM_PASSWORD_REQUIRED,
      phone: httpErrors.CLIENT_ERRORS.USER_PHONE_REQUIRED,
    };

    // Valida os campos obrigatórios
    for (const [field, error] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(error.code).json(error);
      }
    }

    // Validações customizadas (que não são apenas campos obrigatórios)
    if (password !== confirmPassword) {
      return res.status(422).json(httpErrors.CLIENT_ERRORS.PASSWORD_MISMATCH);
    }

    // Verifica se o Usuário já existe
    const userExists = await UserSchema.findOne({ email });

    if (userExists) {
      return res.status(422).json(httpErrors.CLIENT_ERRORS.EMAIL_EXISTS);
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
      return res.status(500).json(httpErrors.SERVER_ERRORS.INTERNAL);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json(httpErrors.CLIENT_ERRORS.EMAIL_AND_PASSWORD_REQUIRED);
    }

    // Verifica se o Usuário existe
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res
        .status(422)
        .json(httpErrors.CLIENT_ERRORS.EMAIL_NOT_REGISTERED);
    }

    // Verifica se a senha bate com a do banco de dados
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json(httpErrors.CLIENT_ERRORS.INVALID_PASSWORD);
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
      ...httpErrors.SUCCESS.USER_AUTHENTICATED,
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
        return res.status(404).json(httpErrors.CLIENT_ERRORS.USER_NOT_FOUND);
      }

      res.status(200).json({
        ...httpErrors.SUCCESS.USER_FOUND,
        user,
      });
    } catch (error) {
      return res.status(500).json(httpErrors.SERVER_ERRORS.INTERNAL);
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
      name: httpErrors.CLIENT_ERRORS.USER_NAME_REQUIRED,
      email: httpErrors.CLIENT_ERRORS.USER_EMAIL_REQUIRED,
      phone: httpErrors.CLIENT_ERRORS.USER_PHONE_REQUIRED,
    };

    for (const [field, error] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(error.code).json(error);
      }
    }

    // Validações customizadas
    const userExists = await UserSchema.findOne({ email: email });
    const customValidations = [
      {
        condition: user.email !== email && userExists,
        error: httpErrors.CLIENT_ERRORS.ANOTHER_EMAIL_IN_USE,
      },
      {
        condition: password && password !== confirmpassword,
        error: httpErrors.CLIENT_ERRORS.PASSWORDS_DONT_MATCH,
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
        ...httpErrors.SUCCESS.USER_UPDATED,
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json(httpErrors.SERVER_ERRORS.INTERNAL);
    }
  }
};
