'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Users',
      'refreshtoken',
      {
        type: Sequelize.TEXT,
        allowNull: false
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Users',
      'refreshtoken',
      {
        type: Sequelize.TEXT,
        allowNull: false
      }
    )
  }
};
