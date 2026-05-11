const express = require("express");
const cors = require("cors");

const app = express();

// Configuração do response JSON
app.use(express.json());

// Resolução do CORS para permitir requisições do frontend
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Configuração para servir arquivos estáticos (imagens)
app.use(express.static("public"));

// Rotas para os endpoints
const UserRoutes = require("./routes/UserRoutes");
app.use("/users", UserRoutes);

// Rotas
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
