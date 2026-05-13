const express = require("express");
const cors = require("cors");
const conn = require("./db/connection");

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger");

const app = express();

// Configuração do response JSON
app.use(express.json());

// Resolução do CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Configuração para servir arquivos estáticos
app.use(express.static("public"));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas para os endpoints
const UserRoutes = require("./routes/UserRoutes");
app.use("/users", UserRoutes);

// Rotas
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
