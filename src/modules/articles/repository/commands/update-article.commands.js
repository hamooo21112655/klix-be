const updateArticle = async (articleToBeUpdated, { title, content, image_url, category }) => {
  articleToBeUpdated.title = title;
  articleToBeUpdated.content = content;
  articleToBeUpdated.image_url = image_url;
  articleToBeUpdated.category = category;
  articleToBeUpdated.save();
  return articleToBeUpdated;
};

module.exports = {
  updateArticle,
};
