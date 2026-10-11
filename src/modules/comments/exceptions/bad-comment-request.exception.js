const throwCommentNotFoundError = (error) => {
  throw new Error(error.message);
};

const throwInvalidCommentError = (error) => {
  throw new Error(error.details[0].message);
};

module.exports = {
  throwCommentNotFoundError,
  throwInvalidCommentError,
};
