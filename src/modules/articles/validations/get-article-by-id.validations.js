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

module.exports = {
  ensureArticleExists,
};
