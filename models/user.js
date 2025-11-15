'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING },
      last_name: { type: DataTypes.STRING },
      phone_number: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      user_type: { type: DataTypes.ENUM('AUTHOR', 'ADMIN'), allowNull: false },
    },
    {
      tableName: 'user',
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Article, {
      through: models.ArticleAuthor,
      foreignKey: 'user_id',
      otherKey: 'article_id',
    });

    User.hasMany(models.Comment, { foreignKey: 'user_id' });
  };

  return User;
};
