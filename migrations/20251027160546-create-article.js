'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('article', {
      article_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING },
      content: { type: Sequelize.TEXT },
      image_url: { type: Sequelize.STRING },
      category: {
        type: Sequelize.ENUM(
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('article');
  },
};
