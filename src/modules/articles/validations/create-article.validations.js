const Joi = require('joi');

const createArticleSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.base': 'Title must be a string.',
    'string.min': 'Title must be at least 3 characters long.',
    'any.required': 'Title is required.',
  }),

  content: Joi.string().min(10).max(250).required().messages({
    'string.base': 'Content must be a string.',
    'string.min': 'Content must be at least 10 characters long.',
    'string.max': 'Content cannot exceed 250 characters.',
    'any.required': 'Content is required.',
  }),

  image_url: Joi.string().uri().allow(null, '').messages({
    'string.base': 'Image URL must be a string.',
    'string.uri': 'Image URL must be a valid URI.',
  }),

  category: Joi.string()
    .valid('VIJESTI', 'BIZNIS', 'SPORT', 'MAGAZIN', 'LIFESTYLE', 'SCITECH', 'AUTO')
    .required()
    .messages({
      'string.base': 'Category must be a string.',
      'any.only':
        'Category must be one of: VIJESTI, BIZNIS, SPORT, MAGAZIN, LIFESTYLE, SCITECH, AUTO.',
      'any.required': 'Category is required.',
    }),
});

module.exports = {
  createArticleSchema,
};
