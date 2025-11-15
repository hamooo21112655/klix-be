const { createArticleSchema } = require('./validations/create-article.validations');
const { createArticle } = require('./repository/commands/create-article.commands');
const { updateArticle } = require('./repository/commands/update-article.commands');
const { getArticles } = require('./repository/query/get-articles.query');
const { getArticleById } = require('./repository/query/get-article-by-id.query');
const { ensureArticleExists } = require('./validations/get-article-by-id.validations');
const { getArticlesSchema } = require('./validations/get-articles.validations');
const {
  throwInvalidArticleError,
  throwArticleNotFoundError,
} = require('./exceptions/bad-article-request.exception');
const { throwInvalidLimitOrPageError } = require('../user/exceptions/bad-user-request.exception');

const createArticleService = async (articleDTO) => {
  const { error } = createArticleSchema.validate(articleDTO);
  if (error) {
    throwInvalidArticleError(error);
  }
  const { title, content, image_url, category } = articleDTO;
  return createArticle(title, content, image_url, category);
};

const updateArticleService = async (articleToBeUpdatedDTO, reqBody) => {
  const { error } = createArticleSchema.validate(reqBody);
  if (error) {
    throwInvalidArticleError(error);
  }
  return updateArticle(articleToBeUpdatedDTO, reqBody);
};

const getAllArticlesService = async (page, limit) => {
  const { error } = getArticlesSchema.validate({ page, limit });
  if (error) {
    throwInvalidLimitOrPageError(error);
  }
  return getArticles(page, limit);
};

const getArticleByIdService = async (articleId) => {
  const article = await getArticleById(articleId);
  const { error } = ensureArticleExists(article, articleId);
  if (error) {
    throw throwArticleNotFoundError(error);
  }
  return article;
};

module.exports = {
  getArticleByIdService,
  getAllArticlesService,
  createArticleService,
  updateArticleService,
};
