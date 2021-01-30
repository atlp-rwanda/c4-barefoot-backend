'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
        return Promise.all([
      queryInterface.removeColumn('Locations', 
      'currency', {
        allowNull: true,
        type: Sequelize.STRING
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
        return Promise.all([
      queryInterface.removeColumn('Locations', 
      'currency', {
        allowNull: true,
        type: Sequelize.STRING
      })
    ]);
  }
};
