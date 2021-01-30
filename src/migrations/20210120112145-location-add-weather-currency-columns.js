'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
        return Promise.all([
      queryInterface.addColumn('Locations', 
      'weather', {
        allowNull: true,
        type: Sequelize.STRING
      }),
     queryInterface.addColumn('Locations', 
      'currency', {
        allowNull: true,
        type: Sequelize.STRING
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
        return Promise.all([
      queryInterface.removeColumn('Locations', 
      'weather', {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Locations', 
      'currency', {
        allowNull: true,
        type: Sequelize.STRING
      })
    ]);
  }
};
