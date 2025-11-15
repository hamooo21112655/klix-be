'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comment', {
      comment_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      content: { type: Sequelize.TEXT },
      is_active: { type: Sequelize.BOOLEAN },
      like_count: { type: Sequelize.INTEGER },
      dislike_count: { type: Sequelize.INTEGER },
      article_id: { type: Sequelize.INTEGER, references: { model: 'article', key: 'article_id' } },
      comment_id_parent: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'comment', key: 'comment_id' },
      },
      user_id: { type: Sequelize.INTEGER, references: { model: 'user', key: 'user_id' } },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comment');
  },
};
