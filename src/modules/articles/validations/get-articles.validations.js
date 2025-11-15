const Joi = require('joi');

const getArticlesSchema = Joi.object({
  page: Joi.number().integer().positive(),
  limit: Joi.number().integer().max(50),
});

module.exports = { getArticlesSchema };
