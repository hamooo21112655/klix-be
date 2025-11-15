const Joi = require('joi');

const createArticleSchema = Joi.object({
  title: Joi.string().min(3).required(), // dodati odgovarajuci message za sve
  content: Joi.string().min(10).max(250).required(), // dodati i max 250 i message
  image_url: Joi.string().uri().allow(null, ''), // isto message
  category: Joi.string()
    .valid('VIJESTI', 'BIZNIS', 'SPORT', 'MAGAZIN', 'LIFESTYLE', 'SCITECH', 'AUTO')
    .required(), // message
});

module.exports = {
  createArticleSchema,
};
