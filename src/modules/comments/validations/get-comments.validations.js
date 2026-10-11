const Joi = require('joi');

const getCommentsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a number.',
    'number.integer': 'Page must be an integer.',
    'number.min': 'Page must be at least 1.',
  }),

  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Limit must be a number.',
    'number.integer': 'Limit must be an integer.',
    'number.min': 'Limit must be at least 1.',
    'number.max': 'Limit cannot exceed 100.',
  }),

  article_id: Joi.number().integer().positive().messages({
    'number.base': 'Article ID must be a number.',
    'number.integer': 'Article ID must be an integer.',
    'number.positive': 'Article ID must be greater than 0.',
  }),

  user_id: Joi.number().integer().positive().messages({
    'number.base': 'User ID must be a number.',
    'number.integer': 'User ID must be an integer.',
    'number.positive': 'User ID must be greater than 0.',
  }),

  comment_id_parent: Joi.number().integer().positive().messages({
    'number.base': 'Parent comment ID must be a number.',
    'number.integer': 'Parent comment ID must be an integer.',
    'number.positive': 'Parent comment ID must be greater than 0.',
  }),
});

module.exports = {
  getCommentsSchema,
};
