const Joi = require('joi');

const getUsersSchema = Joi.object({
  page: Joi.number().integer().positive(),
  limit: Joi.number().integer().max(50),
});

module.exports = { getUsersSchema };
