const Pet = require("../models/Pet");

const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const { ObjectId } = require("mongoose").Types;

module.exports = class PetController {
  // Criar um novo pet
  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    const images = req.files;

    const available = true;

    const requiredFields = {
      name: "O nome do pet é obrigatório.",
      age: "A idade do pet é obrigatória.",
      weight: "O peso do pet é obrigatório.",
      color: "A cor do pet é obrigatória.",
    };

    // Valida os campos obrigatórios do body
    for (const [field, error] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(422).json({
          code: 422,
          status: "error",
          message: error,
        });
      }
    }

    // Valida se as imagens foram enviadas
    if (!req.files || req.files.length === 0) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "É necessário enviar pelo menos uma imagem do pet.",
      });
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
        code: 201,
        status: "success",
        message: "Pet criado com sucesso!",
        newPet,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
      });
    }
  }

  // Listar todos os pets
  static async getAll(req, res) {
    try {
      const pets = await Pet.find().sort("-createdAt");

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Pets listados com sucesso!",
        pets,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
      });
    }
  }

  // Listar os pets do usuário logado
  static async getAllUserPets(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Pets listados com sucesso!",
        pets,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
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

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Pets adotados listados com sucesso!",
        pets,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
      });
    }
  }

  // Listar um pet específico
  static async getPetById(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "ID de pet inválido.",
      });
    }

    try {
      const pet = await Pet.findById(id);

      if (!pet) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Pet não encontrado!",
        });
      }

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Pet encontrado com sucesso!",
        pet,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
      });
    }
  }

  // Excluir um pet
  static async removePetById(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "ID de pet inválido.",
      });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      const pet = await Pet.findById(id);

      if (!pet) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: "Pet não encontrado!",
        });
      }

      if (pet.user._id.toString() !== user._id.toString()) {
        return res.status(403).json({
          code: 403,
          status: "error",
          message: "Você não tem permissão para excluir este pet.",
        });
      }

      await Pet.findByIdAndDelete(id);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Pet excluído com sucesso.",
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
      });
    }
  }

  // Editar um pet
  static async updatePetById(req, res) {
    const { id } = req.params;
    const { name, age, weight, color, available } = req.body;

    const token = getToken(req);
    const user = await getUserByToken(token);
    const updatedData = {};
    const pet = await Pet.findOne({ _id: id });

    const requiredFields = {
      name: "O nome do pet é obrigatório.",
      age: "A idade do pet é obrigatória.",
      weight: "O peso do pet é obrigatório.",
      color: "A cor do pet é obrigatória.",
    };

    if (!pet) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Pet não encontrado!",
      });
    }

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(403).json({
        code: 403,
        status: "error",
        message: "Você não tem permissão para editar este pet.",
      });
    }

    // Valida os campos obrigatórios do body
    for (const [field, error] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(422).json({
          code: 422,
          status: "error",
          message: error,
        });
      }
    }

    if (!req.files || req.files.length === 0) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message: "É necessário enviar pelo menos uma imagem do pet.",
      });
    }

    const images = req.files;

    updatedData.name = name;
    updatedData.age = age;
    updatedData.weight = weight;
    updatedData.color = color;
    updatedData.available = available;

    const newImages = [];
    images.map((image) => {
      newImages.push(image.filename);
    });

    updatedData.images = newImages;

    try {
      await Pet.findByIdAndUpdate(id, updatedData);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Pet atualizado com sucesso.",
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
      });
    }
  }

  // Agendar uma visita para conhecer um pet
  static async schedule(req, res) {
    const { id } = req.params;

    const token = getToken(req);
    const user = await getUserByToken(token);
    const pet = await Pet.findOne({ _id: id });

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "ID de pet inválido.",
      });
    }

    if (!pet) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Pet não encontrado!",
      });
    }

    // check if user registered the pet
    if (pet.user._id.equals(user._id)) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message:
          "Você não pode agendar uma visita para conhecer seu próprio pet.",
      });
    }

    // check if user has already scheduled a visit
    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        return res.status(422).json({
          code: 422,
          status: "error",
          message: "Você já agendou uma visita para conhecer esse pet.",
        });
      }
    }

    // add user to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    try {
      await Pet.findByIdAndUpdate(id, pet);

      res.status(200).json({
        code: 200,
        status: "success",
        message: `Visita agendada com sucesso! Entre em contato com o tutor (${pet.user.name}) para combinar a visita.`,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
      });
    }
  }

  // Concluir a adoção de um pet
  static async concludeAdoption(req, res) {
    const { id } = req.params;

    const token = getToken(req);
    const user = await getUserByToken(token);
    const pet = await Pet.findOne({ _id: id });

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "ID de pet inválido.",
      });
    }

    if (!pet) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Pet não encontrado!",
      });
    }

    // Verifica se o usuário registrou o animal de estimação.
    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(422).json({
        code: 422,
        status: "error",
        message:
          "Você não pode concluir a adoção de um pet que você não registrou.",
      });
    }

    pet.available = false;

    try {
      await Pet.findByIdAndUpdate(id, pet);

      res.status(200).json({
        code: 200,
        status: "success",
        message: "A adoção foi concluída com sucesso!",
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
      });
    }
  }
};
