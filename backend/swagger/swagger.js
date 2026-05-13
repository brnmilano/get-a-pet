const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Get A Pet API",
      version: "1.0.0",
      description: "Documentação da API Get A Pet",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
