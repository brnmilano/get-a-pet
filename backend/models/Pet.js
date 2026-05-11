const mongoose = require("mongoose");
const { Schema } = mongoose;

const PetSchema = mongoose.model(
  "Pet",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      images: {
        type: [String],
        required: true,
      },
      available: {
        type: Boolean,
        required: true,
      },
      user: Object,
      adopter: Object,
    },
    // Cria duas colunas novas automaticamente: createdAt e updatedAt
    { timestamps: true },
  ),
);

module.exports = PetSchema;
