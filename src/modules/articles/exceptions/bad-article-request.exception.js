const throwArticleNotFoundError = (error) => {
  throw new Error(error.message);
};

const throwInvalidArticleError = (error) => {
  throw new Error(error.details[0].message);
};

const throwInvalidArticleIdError = () => {
  throw new Error("Id must be integer");
}

module.exports = {
  throwArticleNotFoundError,
  throwInvalidArticleError,
  throwInvalidArticleIdError
};
