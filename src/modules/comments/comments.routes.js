const express = require('express');

const commentRouter = express.Router();

const {
  getCommentsService,
  getCommentByIdService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
} = require('./comments.service');

const sendError = (res, error) => {
  return res.status(error.status || 500).json({
    error: error.message || 'Internal server error.',
  });
};

commentRouter.get('/', async (req, res) => {
  try {
    const comments = await getCommentsService(req.query);

    return res.status(200).json(comments);
  } catch (error) {
    return sendError(res, error);
  }
});

commentRouter.get('/:id', async (req, res) => {
  try {
    const comment = await getCommentByIdService(req.params.id);

    return res.status(200).json(comment);
  } catch (error) {
    return sendError(res, error);
  }
});

commentRouter.post('/', async (req, res) => {
  try {
    const comment = await createCommentService(req.body);

    return res.status(201).json(comment);
  } catch (error) {
    return sendError(res, error);
  }
});

commentRouter.put('/:id', async (req, res) => {
  try {
    const comment = await updateCommentService(req.params.id, req.body);

    return res.status(200).json(comment);
  } catch (error) {
    return sendError(res, error);
  }
});

commentRouter.delete('/:id', async (req, res) => {
  try {
    await deleteCommentService(req.params.id);

    return res.status(204).json({
      message: 'Comment deleted successfully.',
    });
  } catch (error) {
    return sendError(res, error);
  }
});

module.exports = { commentRouter };
