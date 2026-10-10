const Joi = require('joi');

const ensureArticleExists = (article, id) => {
  let error;
  if (!article) {
    error = {};
    error.message = `Article with ID ${id} not found`;
    error.status = 404;
  }
  return {
    data: article,
    error,
  };
};

const articleIdSchema = Joi.object({
  id: Joi.number().integer().min(1).max(1_000_000).required().messages({
    'number.base': 'Article ID must be a number. Received: {{#value}}',
    'number.integer': 'Article ID must be an integer. Received: {{#value}}',
    'number.min': 'Article ID must be at least 1. Received: {{#value}}',
    'number.max': 'Article ID cannot be greater than 1,000,000. Received: {{#value}}',
    'any.required': 'Article ID is required.',
  }),
});

module.exports = {
  ensureArticleExists,
  articleIdSchema,
};
