const UserSchema = require("../models/User");

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
        return res.status(422).json({ message });
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
        return res.status(422).json({ message: validation.message });
      }
    }

    // Verifica se o Usuário já existe
    const userExists = await UserSchema.findOne({ email });

    if (userExists) {
      return res
        .status(422)
        .json({ message: "Por favor, utilize outro email!" });
    }

    // Cria um novo usuário
    const user = new UserSchema({
      name,
      email,
      password,
      confirmPassword,
      phone,
    });

    try {
      await user.save();

      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      return res.status(500).json({
        message: "Aconteceu um erro no servidor, tente novamente mais tarde!",
      });
    }
  }
};
