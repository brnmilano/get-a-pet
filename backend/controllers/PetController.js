const {
  NAME_REQUIRED,
  AGE_REQUIRED,
  WEIGHT_REQUIRED,
  COLOR_REQUIRED,
  PET_CREATED_SUCCESS,
  SERVER_ERROR,
} = require("../constants/createPet");
const Pet = require("../models/Pet");

const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const httpErrors = require("../constants/httpErrors");
const { ObjectId } = require("mongoose").Types;

module.exports = class PetController {
  // Criar um novo pet
  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    const images = req.files;

    console.log(name);

    const available = true;

    const requiredFields = {
      name: httpErrors.CLIENT_ERRORS.PET_NAME_REQUIRED,
      age: httpErrors.CLIENT_ERRORS.PET_AGE_REQUIRED,
      weight: httpErrors.CLIENT_ERRORS.PET_WEIGHT_REQUIRED,
      color: httpErrors.CLIENT_ERRORS.PET_COLOR_REQUIRED,
    };

    // Valida os campos obrigatórios do body
    for (const [field, error] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(error.code).json(error);
      }
    }

    // Valida se as imagens foram enviadas
    if (!req.files || req.files.length === 0) {
      return res.status(422).json(httpErrors.CLIENT_ERRORS.PET_IMAGES_REQUIRED);
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();

      res.status(201).json({
        message: PET_CREATED_SUCCESS,
        newPet,
      });
    } catch (error) {
      res.status(500).json({
        message: `${SERVER_ERROR}: ${error}`,
      });
    }
  }

  // Listar todos os pets
  static async getAll(req, res) {
    try {
      const pets = await Pet.find().sort("-createdAt");

      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({
        message: `${SERVER_ERROR}: ${error}`,
      });
    }
  }

  // Listar os pets do usuário logado
  static async getAllUserPets(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({
        message: `${SERVER_ERROR}: ${error}`,
      });
    }
  }

  // Listar os pets adotados pelo usuário logado
  static async getAllUserAdoptions(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      const pets = await Pet.find({ "adopter._id": user._id }).sort(
        "-createdAt",
      );

      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({
        message: `${SERVER_ERROR}: ${error}`,
      });
    }
  }

  // Listar um pet específico
  static async getPetById(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json(httpErrors.CLIENT_ERRORS.INVALID_PET_ID);
    }

    try {
      const pet = await Pet.findById(id);

      if (!pet) {
        return res.status(404).json(httpErrors.CLIENT_ERRORS.PET_NOT_FOUND);
      }

      res.status(200).json(pet);
    } catch (error) {
      res.status(500).json({
        message: `${SERVER_ERROR}: ${error}`,
      });
    }
  }

  // Excluir um pet
  static async removePetById(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json(httpErrors.CLIENT_ERRORS.INVALID_PET_ID);
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      const pet = await Pet.findById(id);

      if (!pet) {
        return res.status(404).json(httpErrors.CLIENT_ERRORS.PET_NOT_FOUND);
      }

      if (pet.user._id.toString() !== user._id.toString()) {
        return res.status(403).json(httpErrors.CLIENT_ERRORS.UNAUTHORIZED);
      }

      await Pet.findByIdAndDelete(id);

      res.status(200).json(httpErrors.SUCCESS.PET_DELETED);
    } catch (error) {
      res.status(500).json({
        message: `${SERVER_ERROR}: ${error}`,
      });
    }
  }
};
