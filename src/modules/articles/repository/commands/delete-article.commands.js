'use strict';

const { Article } = require('../../../../../models');

const deleteArticle = async (articleId) => {
  return Article.destroy({
    where: {
      article_id: articleId,
    },
  });
};

module.exports = {
  deleteArticle,
};
