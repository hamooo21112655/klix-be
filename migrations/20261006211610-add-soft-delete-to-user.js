'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.addColumn('user', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.addColumn('user', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user', 'deleted_at');
    await queryInterface.removeColumn('user', 'updated_at');
    await queryInterface.removeColumn('user', 'created_at');
  },
};
