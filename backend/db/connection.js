const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/getapetdb");
  console.log("Conectou com Mongoose!");
}

main().catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
  process.exit(1);
});

module.exports = mongoose;
