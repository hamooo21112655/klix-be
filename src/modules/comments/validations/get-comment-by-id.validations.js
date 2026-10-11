const Joi = require('joi');

const ensureCommentExists = (comment, id) => {
  let error;
  if (!comment) {
    error = {};
    error.message = `Comment with ID ${id} not found`;
    error.status = 404;
  }
  return {
    data: comment,
    error,
  };
};

const getCommentByIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'Comment ID must be a number.',
    'number.integer': 'Comment ID must be an integer.',
    'number.positive': 'Comment ID must be greater than 0.',
    'any.required': 'Comment ID is required.',
  }),
});

module.exports = {
  getCommentByIdSchema,
  ensureCommentExists,
};
