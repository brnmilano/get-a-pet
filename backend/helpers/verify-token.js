const jwt = require("jsonwebtoken");
const getToken = require("./get-token");

// Middleware para verificar o token de autenticação
const checkToken = (req, res, next) => {
  try {
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({
        code: 401,
        status: "error",
        message: "Acesso negado! Token não fornecido.",
      });
    }

    const secret = "nossosecret";
    const verifed = jwt.verify(token, secret);

    req.user = verifed;
    next();
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "error",
      message: "Token inválido!",
    });
  }
};

module.exports = checkToken;
