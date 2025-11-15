const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2).required(),
  phone_number: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  user_type: Joi.string().valid('AUTHOR', 'ADMIN').required(),
});

const isPhoneNumberTaken = (usersByPhoneNumber) => {
  return usersByPhoneNumber.length > 0;
};

const isEmailTaken = (usersByEmail) => {
  return usersByEmail.length > 0;
};

module.exports = {
  createUserSchema,
  isPhoneNumberTaken,
  isEmailTaken,
};
