import axios from "axios";

// Definir URL da API baseado no ambiente
const getApiUrl = () => {
  const env = import.meta.env.VITE_ENV || "development";
  switch (env) {
    case "production":
      return import.meta.env.VITE_PROD_API_URL;
    case "homolog":
      return import.meta.env.VITE_HML_API_URL;
    case "development":
    default:
      return import.meta.env.VITE_DEV_API_URL || "http://localhost:5000";
  }
};

export default axios.create({
  baseURL: getApiUrl(),
});
