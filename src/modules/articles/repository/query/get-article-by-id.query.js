const db = require('../../../../../models/index.js');

const { Article } = db;

const getArticleById = async (id) => {
  return Article.findByPk(id);
};

module.exports = { getArticleById };
