const PetController = require("../controllers/PetController");

const router = require("express").Router();

const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

/**
 * @swagger
 * /pets/create:
 *   post:
 *     summary: Criar um novo animal de estimação
 *     description: Cria um novo animal de estimação com informações básicas e imagens. Requer autenticação.
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - weight
 *               - color
 *               - available
 *               - images
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rex
 *                 description: Nome do animal de estimação
 *               age:
 *                 type: number
 *                 example: 3
 *                 description: Idade do animal em anos
 *               weight:
 *                 type: number
 *                 example: 25.5
 *                 description: Peso do animal em kg
 *               color:
 *                 type: string
 *                 example: Marrom
 *                 description: Cor do animal
 *               available:
 *                 type: boolean
 *                 example: true
 *                 description: Disponibilidade para adoção
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 5
 *                 description: Imagens do animal (máximo 5)
 *     responses:
 *       201:
 *         description: Animal criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newPet:
 *                   type: object
 *             example:
 *               message: "Pet cadastrado com sucesso!"
 *               newPet:
 *                 _id: "6a0b4fdcd4ed8a0c7d1779d0"
 *                 name: "Rex"
 *                 age: 3
 *                 weight: 4
 *                 color: "Preto"
 *                 images: ["177912623685251.421610136312836.jpeg"]
 *                 available: true
 *                 user:
 *                   _id: "6a04cf71a0e6560c9d8bca2c"
 *                   name: "Bruno Milano"
 *                   image: "1778700151140.jpeg"
 *                 createdAt: "2026-05-18T17:43:56.872Z"
 *                 updatedAt: "2026-05-18T17:43:56.872Z"
 *                 __v: 0
 *       400:
 *         description: Erro de validação - campos obrigatórios faltando
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/create",
  verifyToken,
  imageUpload.array("images", 5),
  PetController.create,
);

/**
 * @swagger
 * /pets/all:
 *   get:
 *     summary: Listar todos os animais de estimação
 *     description: Retorna uma lista de todos os animais de estimação disponíveis no sistema.
 *     tags:
 *       - Pets
 *     responses:
 *       200:
 *         description: Lista de animais obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               - _id: "6a0b4fdcd4ed8a0c7d1779d0"
 *                 name: "Rex"
 *                 age: 3
 *                 weight: 4
 *                 color: "Preto"
 *                 images: ["177912623685251.421610136312836.jpeg"]
 *                 available: true
 *                 user:
 *                   _id: "6a04cf71a0e6560c9d8bca2c"
 *                   name: "Bruno Milano"
 *                   image: "1778700151140.jpeg"
 *                 createdAt: "2026-05-18T17:43:56.872Z"
 *                 updatedAt: "2026-05-18T17:43:56.872Z"
 *                 __v: 0
 *               - _id: "6a0b4fdcd4ed8a0c7d1779d1"
 *                 name: "Luna"
 *                 age: 2
 *                 weight: 3.5
 *                 color: "Branco"
 *                 images: ["177912623685252.421610136312836.jpeg"]
 *                 available: true
 *                 user:
 *                   _id: "6a04cf71a0e6560c9d8bca2d"
 *                   name: "João Silva"
 *                   image: "1778700151141.jpeg"
 *                 createdAt: "2026-05-17T10:20:30.123Z"
 *                 updatedAt: "2026-05-17T10:20:30.123Z"
 *                 __v: 0
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/all", PetController.getAll);

/**
 * @swagger
 * /pets/mypets:
 *   get:
 *     summary: Listar animais de estimação do usuário
 *     description: Retorna uma lista de todos os animais de estimação cadastrados pelo usuário autenticado.
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pets do usuário obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               - _id: "6a0b4fdcd4ed8a0c7d1779d0"
 *                 name: "Rex"
 *                 age: 3
 *                 weight: 4
 *                 color: "Preto"
 *                 images: ["177912623685251.421610136312836.jpeg"]
 *                 available: true
 *                 user:
 *                   _id: "6a04cf71a0e6560c9d8bca2c"
 *                   name: "Bruno Milano"
 *                   image: "1778700151140.jpeg"
 *                 createdAt: "2026-05-18T17:43:56.872Z"
 *                 updatedAt: "2026-05-18T17:43:56.872Z"
 *                 __v: 0
 *               - _id: "6a0b4fdcd4ed8a0c7d1779d2"
 *                 name: "Max"
 *                 age: 5
 *                 weight: 15
 *                 color: "Dourado"
 *                 images: ["177912623685253.421610136312836.jpeg"]
 *                 available: false
 *                 adopter:
 *                   _id: "6a04cf71a0e6560c9d8bca2e"
 *                   name: "Maria Santos"
 *                   image: "1778700151142.jpeg"
 *                 createdAt: "2026-05-16T14:30:00.123Z"
 *                 updatedAt: "2026-05-18T09:15:45.123Z"
 *                 __v: 0
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/mypets", verifyToken, PetController.getAllUserPets);

/**
 * @swagger
 * /pets/myadoptions:
 *   get:
 *     summary: Listar adoções do usuário
 *     description: Retorna uma lista de todos os animais de estimação adotados pelo usuário autenticado.
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de adoções do usuário obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               - _id: "6a0b4fdcd4ed8a0c7d1779d2"
 *                 name: "Max"
 *                 age: 5
 *                 weight: 15
 *                 color: "Dourado"
 *                 images: ["177912623685253.421610136312836.jpeg"]
 *                 available: false
 *                 user:
 *                   _id: "6a04cf71a0e6560c9d8bca2f"
 *                   name: "Ana Costa"
 *                   image: "1778700151143.jpeg"
 *                 adopter:
 *                   _id: "6a04cf71a0e6560c9d8bca2c"
 *                   name: "Bruno Milano"
 *                   image: "1778700151140.jpeg"
 *                 createdAt: "2026-05-16T14:30:00.123Z"
 *                 updatedAt: "2026-05-18T09:15:45.123Z"
 *                 __v: 0
 *               - _id: "6a0b4fdcd4ed8a0c7d1779d3"
 *                 name: "Bella"
 *                 age: 1
 *                 weight: 2.5
 *                 color: "Cinza"
 *                 images: ["177912623685254.421610136312836.jpeg"]
 *                 available: false
 *                 user:
 *                   _id: "6a04cf71a0e6560c9d8bca2g"
 *                   name: "Pedro Oliveira"
 *                   image: "1778700151144.jpeg"
 *                 adopter:
 *                   _id: "6a04cf71a0e6560c9d8bca2c"
 *                   name: "Bruno Milano"
 *                   image: "1778700151140.jpeg"
 *                 createdAt: "2026-05-15T10:00:00.123Z"
 *                 updatedAt: "2026-05-17T16:30:45.123Z"
 *                 __v: 0
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions);

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Obter detalhes de um animal de estimação específico
 *     description: Retorna os detalhes completos de um animal de estimação pelo seu ID.
 *     tags:
 *       - Pets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único do pet (MongoDB ObjectId)
 *         example: "6a0b4fdcd4ed8a0c7d1779d0"
 *     responses:
 *       200:
 *         description: Pet encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               _id: "6a0b4fdcd4ed8a0c7d1779d0"
 *               name: "Rex"
 *               age: 3
 *               weight: 4
 *               color: "Preto"
 *               images: ["177912623685251.421610136312836.jpeg"]
 *               available: true
 *               user:
 *                 _id: "6a04cf71a0e6560c9d8bca2c"
 *                 name: "Bruno Milano"
 *                 image: "1778700151140.jpeg"
 *               adopter:
 *               createdAt: "2026-05-18T17:43:56.872Z"
 *               updatedAt: "2026-05-18T17:43:56.872Z"
 *               __v: 0
 *       404:
 *         description: Pet não encontrado
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Pet não encontrado!"
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", PetController.getPetById);

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Deletar um animal de estimação
 *     description: Remove um animal de estimação pelo seu ID. Apenas o proprietário do pet pode deletá-lo. Requer autenticação.
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único do pet (MongoDB ObjectId)
 *         example: "6a0b4fdcd4ed8a0c7d1779d0"
 *     responses:
 *       200:
 *         description: Pet deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               status: "success"
 *               message: "Pet deletado com sucesso!"
 *       400:
 *         description: ID do pet inválido
 *         content:
 *           application/json:
 *             example:
 *               code: 400
 *               status: "error"
 *               message: "ID do pet inválido!"
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Permissão negada (não é o proprietário do pet)
 *       404:
 *         description: Pet não encontrado
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Pet não encontrado!"
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", verifyToken, PetController.removePetById);

module.exports = router;
