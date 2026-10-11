const Joi = require('joi');

const createArticleSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).max(250).required(),
  image_url: Joi.string().uri().allow(null, ''),
  category: Joi.string()
    .valid('VIJESTI', 'BIZNIS', 'SPORT', 'MAGAZIN', 'LIFESTYLE', 'SCITECH', 'AUTO')
    .required(),
});

module.exports = {
  createArticleSchema,
};
