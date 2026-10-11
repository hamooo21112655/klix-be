const { Comment } = require('../../../../../models');

const createComment = async (commentData) => {
  return Comment.create(commentData);
};

module.exports = {
  createComment,
};
