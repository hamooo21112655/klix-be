const db = require('../../../../../models/index.js');

const { Comment } = db;

const deleteComment = async (commentId) => {
  return Comment.destroy({
    where: {
      comment_id: commentId,
    },
  });
};

module.exports = {
  deleteComment,
};
