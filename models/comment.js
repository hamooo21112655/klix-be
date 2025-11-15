'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: { type: DataTypes.TEXT },
      is_active: { type: DataTypes.BOOLEAN },
      like_count: { type: DataTypes.INTEGER },
      dislike_count: { type: DataTypes.INTEGER },
      article_id: { type: DataTypes.INTEGER, allowNull: false },
      comment_id_parent: { type: DataTypes.INTEGER, allowNull: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: 'comment',
      timestamps: false,
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.Article, { foreignKey: 'article_id' });
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
    Comment.hasMany(models.Comment, { as: 'Replies', foreignKey: 'comment_id_parent' });
    Comment.belongsTo(models.Comment, { as: 'Parent', foreignKey: 'comment_id_parent' });
  };

  return Comment;
};
