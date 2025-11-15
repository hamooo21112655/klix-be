'use strict';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      article_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: DataTypes.STRING },
      content: { type: DataTypes.TEXT },
      image_url: { type: DataTypes.STRING },
      category: {
        type: DataTypes.ENUM(
          'VIJESTI',
          'BIZNIS',
          'SPORT',
          'MAGAZIN',
          'LIFESTYLE',
          'SCITECH',
          'AUTO'
        ),
        allowNull: false,
      },
    },
    {
      tableName: 'article',
      timestamps: false,
    }
  );

  Article.associate = (models) => {
    Article.belongsToMany(models.User, {
      through: models.ArticleAuthor,
      foreignKey: 'article_id',
      otherKey: 'user_id',
    });

    Article.hasMany(models.Comment, { foreignKey: 'article_id' });
  };

  return Article;
};
