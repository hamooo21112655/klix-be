const {
  throwArticleNotFoundError,
} = require('../articles/exceptions/bad-article-request.exception');
const { getArticleById } = require('../articles/repository/query/get-article-by-id.query');
const { throwUserNotFoundError } = require('../user/exceptions/bad-user-request.exception');
const { getUserById } = require('../user/repository/query/get-user-by-id.query');
const {
  throwCommentNotFoundError,
  throwInvalidCommentError,
} = require('./exceptions/bad-comment-request.exception');
const { createComment } = require('./repository/commands/create-comment.commands');
const { deleteComment } = require('./repository/commands/delete-comment.commands');
const { updateComment } = require('./repository/commands/update-comment.commands');
const { getCommentById } = require('./repository/query/get-comment-by-id.query');
const { createCommentSchema } = require('./validations/create-comment.validations');
const { getCommentByIdSchema } = require('./validations/get-comment-by-id.validations');
const { getCommentsSchema } = require('./validations/get-comments.validations');

const validate = (schema, data) => {
  const { value, error } = schema.validate(data);

  if (error) {
    throwInvalidCommentError(error);
  }

  return value;
};

const getCommentsService = async (query = {}) => {
  const filters = validate(getCommentsSchema, query);

  return getComments(filters);
};

const getCommentByIdService = async (rawId) => {
  const { id, error: errorId } = validate(getCommentByIdSchema, {
    id: rawId,
  });

  if (errorId) {
    throwInvalidCommentError(errorId);
  }

  const comment = await getCommentById(id);

  if (!comment) {
    throwCommentNotFoundError({ message: `Comment with id ${value?.id} not found.` });
  }

  return comment;
};

const createCommentService = async (commentDTO) => {
  const commentData = validate(createCommentSchema, commentDTO);

  const article = await getArticleById(commentData.article_id);

  if (!article) {
    throwArticleNotFoundError({ message: `Article with id ${commentData.article_id} not found.` });
  }

  const user = await getUserById(commentData.user_id);

  if (!user) {
    throwUserNotFoundError({ message: `User with id ${commentData.article_id} not found.` });
  }

  return createComment({
    content: commentData.content,
    article_id: commentData.article_id,
    user_id: commentData.user_id,
    comment_id_parent: commentData.comment_id_parent,
    is_active: true,
    like_count: 0,
    dislike_count: 0,
  });
};

const updateCommentService = async (rawId, commentDTO) => {
  const { id } = validate(getCommentByIdSchema, {
    id: rawId,
  });

  const comment = validate(createCommentSchema, commentDTO);

  const existingComment = await getCommentById(id);

  if (!existingComment) {
    throwCommentNotFoundError({ message: `Comment with id ${commentData.article_id} not found.` });
  }

  const updatedRows = await updateComment(id, comment);

  return getCommentById(id);
};

const deleteCommentService = async (rawId) => {
  const { id } = validate(getCommentByIdSchema, {
    id: rawId,
  });

  const existingComment = await getCommentById(id);

  if (!existingComment) {
    throwCommentNotFoundError({ message: `Comment with id ${commentData.article_id} not found.` });
  }

  await deleteComment(id);
};

module.exports = {
  getCommentsService,
  getCommentByIdService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
};
