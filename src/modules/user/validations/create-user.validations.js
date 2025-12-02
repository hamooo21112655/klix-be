const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(255)
    .required()
    .messages({
      'string.base': 'Name must be a string. Received string with: {{#value}}',
      'string.min': 'Name must be at least 2 characters. Received: {{#value}}',
      'string.max': 'Name cannot exceed {{#limit}} characters. Received: {{#value}}',
      'any.required': 'Name is required.'
    }),

  last_name: Joi.string()
    .min(2)
    .max(255)
    .required()
    .messages({
      'string.base': 'Last name must be a string. Received: {{#value}}',
      'string.min': 'Last name must be at least 2 characters. Received: {{#value}}',
      'string.max': 'Last name cannot exceed {{#limit}} characters. Received: {{#value}}',
      'any.required': 'Last name is required.'
    }),

  phone_number: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'Phone number must be a string. Received: {{#value}}',
      'string.min': 'Phone number must be at least 6 characters. Received: {{#value}}',
      'any.required': 'Phone number is required.'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email must be a valid email address. Received: {{#value}}',
      'any.required': 'Email is required.'
    }),

  user_type: Joi.string()
    .valid('AUTHOR', 'ADMIN')
    .required()
    .messages({
      'any.only': 'User type must be either AUTHOR or ADMIN. Received: {{#value}}',
      'any.required': 'User type is required.'
    }),
});

const isPhoneNumberTaken = usersByPhoneNumber => usersByPhoneNumber.length > 0;

const isEmailTaken = usersByEmail => usersByEmail.length > 0;

const isEmailOrPhoneNumberTaken = fetchedUsers => isEmailTaken(fetchedUsers) || isPhoneNumberTaken(fetchedUsers);

module.exports = {
  createUserSchema,
  isPhoneNumberTaken,
  isEmailTaken,
  isEmailOrPhoneNumberTaken
};
