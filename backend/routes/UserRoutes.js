const router = require("express").Router();
const UserController = require("../controllers/UserController");

// Rota para criar um novo usuário
router.post("/register", UserController.register);

module.exports = router;
