'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('article_author', {
      article_user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, references: { model: 'user', key: 'user_id' } },
      article_id: { type: Sequelize.INTEGER, references: { model: 'article', key: 'article_id' } },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('article_author');
  },
};
