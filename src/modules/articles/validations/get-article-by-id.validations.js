const ensureArticleExists = (article, id) => {
  let error;
  if (!article) {
    error = {};
    error.message = `Article with ID ${id} not found`;
    error.status = 404;
  }
  return {
    data: article,
    error,
  };
};

const isArticleIdInvalid = id => Number.isNaN(id) || !Number.isInteger(id);

module.exports = {
  ensureArticleExists,
  isArticleIdInvalid
};
