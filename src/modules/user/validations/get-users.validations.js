const Joi = require('joi');

const getUsersSchema = Joi.object({
  page: Joi.number()
    .integer()
    .positive()
    .messages({
      'number.base': 'Page must be a number. Received: {{#value}}',
      'number.integer': 'Page must be an integer. Received: {{#value}}',
      'number.positive': 'Page must be a positive number. Received: {{#value}}',
    }),

  limit: Joi.number()
    .integer()
    .positive()
    .max(50)
    .messages({
      'number.base': 'Limit must be a number. Received: {{#value}}',
      'number.integer': 'Limit must be an integer. Received: {{#value}}',
      'number.positive': 'Limit must be a positive number. Received: {{#value}}',
      'number.max': 'Limit cannot be greater than 50. Received: {{#value}}',
    }),
});


module.exports = { getUsersSchema };
