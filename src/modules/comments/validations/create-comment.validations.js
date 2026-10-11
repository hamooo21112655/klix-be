const Joi = require('joi');

const createCommentSchema = Joi.object({
  content: Joi.string().trim().min(1).required().messages({
    'string.base': 'Comment content must be a string.',
    'string.empty': 'Comment content cannot be empty.',
    'string.min': 'Comment content cannot be empty.',
    'any.required': 'Comment content is required.',
  }),

  article_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Article ID must be a number.',
    'number.integer': 'Article ID must be an integer.',
    'number.positive': 'Article ID must be greater than 0.',
    'any.required': 'Article ID is required.',
  }),

  user_id: Joi.number().integer().positive().required().messages({
    'number.base': 'User ID must be a number.',
    'number.integer': 'User ID must be an integer.',
    'number.positive': 'User ID must be greater than 0.',
    'any.required': 'User ID is required.',
  }),

  comment_id_parent: Joi.number().integer().positive().allow(null).optional().messages({
    'number.base': 'Parent comment ID must be a number or null.',
    'number.integer': 'Parent comment ID must be an integer.',
    'number.positive': 'Parent comment ID must be greater than 0.',
  }),

  is_active: Joi.boolean().default(true).messages({
    'boolean.base': 'Is active must be a boolean.',
  }),

  like_count: Joi.number().integer().min(0).default(0).messages({
    'number.base': 'Like count must be a number.',
    'number.integer': 'Like count must be an integer.',
    'number.min': 'Like count cannot be negative.',
  }),

  dislike_count: Joi.number().integer().min(0).default(0).messages({
    'number.base': 'Dislike count must be a number.',
    'number.integer': 'Dislike count must be an integer.',
    'number.min': 'Dislike count cannot be negative.',
  }),
});

module.exports = {
  createCommentSchema,
};
