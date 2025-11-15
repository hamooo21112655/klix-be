const db = require('../../../../../models/index.js');

const { Article } = db;

const getArticles = async (page, limit) => {
  const offset = (page - 1) * limit;

  const { rows, count } = await Article.findAndCountAll({
    limit,
    offset,
  });

  return {
    page,
    limit,
    totalPages: Math.ceil(count / limit),
    data: rows,
  };
};
module.exports = { getArticles };
