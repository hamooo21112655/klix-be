const { Comment } = require('../../../../../models');

const getCommentById = async (commentId) => {
  return Comment.findByPk(commentId);
};

module.exports = {
  getCommentById,
};
