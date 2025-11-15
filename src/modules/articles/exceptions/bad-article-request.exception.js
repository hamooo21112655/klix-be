const throwArticleNotFoundError = (error) => {
  throw new Error(error.message);
};

const throwInvalidArticleError = (error) => {
  throw new Error(error.details[0].message);
};

module.exports = {
  throwArticleNotFoundError,
  throwInvalidArticleError,
};
