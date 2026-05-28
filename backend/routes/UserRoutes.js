const router = require("express").Router();

const UserController = require("../controllers/UserController");

const { imageUpload } = require("../helpers/image-upload");

// Middleware para verificar o token de autenticação
const verifyToken = require("../helpers/verify-token");

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
 *           example:
 *             name: Bruno Milano
 *             email: brnmilano.dev@gmail.com
 *             password: "123"
 *             confirmPassword: "123"
 *             phone: "(61) 98342-6022"
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       422:
 *         description: Dados inválidos ou campos obrigatórios faltando
 *       500:
 *         description: Erro no servidor
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
 *     description: Verifica se o usuário está autenticado e retorna seus dados. Requer autenticação via token Bearer.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado e seus dados retornados com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro no servidor
 * */
router.get("/checkuser", UserController.checkUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obter usuário por ID
 *     description: Retorna os dados de um usuário específico pelo seu ID.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 * */
router.get("/:id", UserController.getUserById);

/**
 * @swagger
 * /users/edit/{id}:
 *   patch:
 *     summary: Editar usuário
 *     description: Atualiza os dados de um usuário existente. Requer autenticação via token.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bruno Milano
 *               email:
 *                 type: string
 *                 example: brnmilano.dev@gmail.com
 *               phone:
 *                 type: string
 *                 example: "(61) 98342-6022"
 *               password:
 *                 type: string
 *                 example: "123"
 *               confirmpassword:
 *                 type: string
 *                 example: "123"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagem do perfil do usuário
 *             example:
 *               name: Bruno Milano
 *               email: brnmilano.dev@gmail.com
 *               phone: "(61) 98342-6022"
 *               password: "123"
 *               confirmpassword: "123"
 *               image: <arquivo binário>
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       422:
 *         description: Dados inválidos ou campos obrigatórios faltando
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 * */
router.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser,
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     description: Deleta a conta de um usuário. Requer autenticação via token Bearer.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser deletado
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       403:
 *         description: Sem permissão para deletar este usuário
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro no servidor
 * */
router.delete("/:id", verifyToken, UserController.deleteUser);

module.exports = router;
