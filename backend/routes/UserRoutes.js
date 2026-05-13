const router = require("express").Router();

const UserController = require("../controllers/UserController");

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Criar usuário
 *     description: Cadastra um novo usuário na aplicação.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bruno Milano
 *               email:
 *                 type: string
 *                 example: brnmilano.dev@gmail.com
 *               password:
 *                 type: string
 *                 example: "123"
 *               confirmPassword:
 *                 type: string
 *                 example: "123"
 *               phone:
 *                 type: string
 *                 example: "(61) 98342-6022"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/register", UserController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de usuário
 *     description: Autentica um usuário existente na aplicação.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: bruno@gmail.com
 *               password:
 *                 type: string
 *                 example: "123"
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       422:
 *         description: Dados inválidos ou campos obrigatórios faltando
 *       401:
 *         description: Email ou senha inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 * */
router.post("/login", UserController.login);

/**
 * @swagger
 * /users/checkuser:
 *   get:
 *     summary: Verifica se o usuário está autenticado
 *     description: Verifica se o usuário está autenticado e retorna seus dados.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado e seus dados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro no servidor
 * */
router.get("/checkuser", UserController.checkUser);

module.exports = router;
