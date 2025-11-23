const {
  createArticleService,
  getAllArticlesService,
  getArticleByIdService,
  updateArticleService,
} = require('./articles.service');

const express = require('express');

const articleRouter = express.Router();

articleRouter.post('/', async (req, res) => {
  try {
    const newArticle = await createArticleService(req.body);
    return res.status(200).json({ message: 'Added new article', newArticle });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

articleRouter.get('/', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  try {
    const allArticles = await getAllArticlesService(page, limit);
    return res.status(200).json(allArticles);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

articleRouter.put('/:id', async (req, res) => {
  const rawId = req.params.id
  try {
    const articleToBeUpdated = await getArticleByIdService(rawId);
    const updatedArticle = await updateArticleService(articleToBeUpdated, req.body);
    return res.status(200).json({ message: 'Article updated successfully', updatedArticle });
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.message });
  }
});

articleRouter.get('/:id', async (req, res) => {
  const rawId = req.params.id;
  try {
    const article = await getArticleByIdService(rawId);
    return res.status(200).json(article);
  } catch (err) {
    return res.status(err.status || 400).json({ error: err.message });
  }
});

module.exports = { articleRouter };
