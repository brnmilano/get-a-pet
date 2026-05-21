require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conn = require("./db/connection");

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger");

const app = express();

// Definir URL do cliente baseado no ambiente
const getClientUrl = () => {
  const env = process.env.NODE_ENV || "development";

  switch (env) {
    case "production":
      return process.env.PROD_CLIENT_URL;
    case "homolog":
      return process.env.HML_CLIENT_URL;
    case "development":
    default:
      return process.env.DEV_CLIENT_URL || "http://localhost:5173";
  }
};

// Configuração do response JSON
app.use(express.json());

// Resolução do CORS
app.use(
  cors({
    credentials: true,
    origin: getClientUrl(),
  }),
);

// Configuração para servir arquivos estáticos
app.use(express.static("public"));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas para os endpoints
const UserRoutes = require("./routes/UserRoutes");
const PetRoutes = require("./routes/PetRoutes");

app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);

// Rotas
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
