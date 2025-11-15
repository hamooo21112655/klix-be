const db = require('../../../../../models/index.js');

const { Article } = db;

const createArticle = async (title, content, image_url, category) => {
  return await Article.create({
    title,
    content,
    image_url,
    category,
  });
};

module.exports = { createArticle };
