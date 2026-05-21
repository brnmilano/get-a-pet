const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = mongoose.model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      confirmPassword: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    // Cria duas colunas novas automaticamente: createdAt e updatedAt
    { timestamps: true, versionKey: false },
  ),
);

module.exports = UserSchema;
