const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  // Criação do token
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    "nossosecret",
    {
      expiresIn: "1d",
    },
  );

  // Retorna o token e os dados do usuário
  res.status(200).json({
    code: 200,
    status: "success",
    message: `O usuário ${user.name} está autenticado!`,
    token: token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = createUserToken;
