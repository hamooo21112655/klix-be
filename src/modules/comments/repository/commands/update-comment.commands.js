const { Comment } = require('../../../../../models');

const updateComment = async (commentId, commentData) => {
  const [updatedRows] = await Comment.update(commentData, {
    where: {
      comment_id: commentId,
    },
  });

  return updatedRows;
};

module.exports = {
  updateComment,
};
