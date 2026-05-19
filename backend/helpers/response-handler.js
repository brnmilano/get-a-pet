/**
 * ResponseHandler - Helper para padronizar respostas da API
 * Centraliza a lógica de resposta em sucesso e erro
 */

const httpErrors = require("../constants/httpErrors");

module.exports = {
  /**
   * Retorna uma resposta de sucesso padronizada
   * @param {Object} res - Response object do Express
   * @param {Object} successConfig - Configuração de sucesso de httpErrors.SUCCESS
   * @param {*} data - Dados a serem retornados (opcional)
   * @returns {Object} Resposta JSON
   */
  success(res, successConfig, data = null) {
    const response = {
      status: successConfig.status,
      message: successConfig.message,
    };

    if (data !== null) {
      response.data = data;
    }

    return res.status(successConfig.code).json(response);
  },

  /**
   * Retorna uma resposta de erro padronizada
   * @param {Object} res - Response object do Express
   * @param {Object} errorConfig - Configuração de erro de httpErrors.CLIENT_ERRORS ou SERVER_ERRORS
   * @param {*} additionalError - Erro adicional para debug (opcional)
   * @returns {Object} Resposta JSON
   */
  error(res, errorConfig, additionalError = null) {
    const response = {
      status: errorConfig.status,
      message: errorConfig.message,
    };

    if (additionalError && process.env.NODE_ENV === "development") {
      response.error = additionalError;
    }

    return res.status(errorConfig.code).json(response);
  },

  /**
   * Validação centralizada de campos obrigatórios
   * @param {Object} data - Objeto com dados a validar
   * @param {Object} fieldsMap - Map de { fieldName: errorConfig }
   * @param {Object} res - Response object do Express
   * @returns {boolean} true se todos os campos são válidos, false caso contrário
   */
  validateRequiredFields(data, fieldsMap, res) {
    for (const [field, errorConfig] of Object.entries(fieldsMap)) {
      if (!data[field]) {
        this.error(res, errorConfig);
        return false;
      }
    }
    return true;
  },
};
