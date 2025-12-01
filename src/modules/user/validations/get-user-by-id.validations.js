const Joi = require('joi');

const ensureUserExists = (user, id) => {
  let error;
  if (!user) {
    error = {};
    error.message = `User with ID ${id} not found`;
    error.status = 404;
  }
  return {
    data: user,
    error,
  };
};

const userIdSchema = Joi.object({
  id: Joi.number().integer()
    .min(1)
    .max(1_000_000)
    .required()
    .messages({
      'number.base': 'User ID must be a number. Received: {{#value}}',
      'number.integer': 'User ID must be an integer. Received: {{#value}}',
      'number.min': 'User ID must be at least 1. Received: {{#value}}',
      'number.max': 'User ID cannot be greater than 1,000,000. Received: {{#value}}',
      'any.required': 'User ID is required.'
    })
});



module.exports = {
  ensureUserExists,
  userIdSchema
};