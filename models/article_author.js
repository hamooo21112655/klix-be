'use strict';

module.exports = (sequelize, DataTypes) => {
  const ArticleAuthor = sequelize.define(
    'ArticleAuthor',
    {
      article_user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'article_author',
      timestamps: false,
    }
  );

  return ArticleAuthor;
};
