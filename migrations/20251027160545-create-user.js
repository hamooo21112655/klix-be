'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING },
      last_name: { type: Sequelize.STRING },
      phone_number: { type: Sequelize.STRING }, // dodati unique
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      user_type: { type: Sequelize.ENUM('AUTHOR', 'ADMIN'), allowNull: false },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  },
};
