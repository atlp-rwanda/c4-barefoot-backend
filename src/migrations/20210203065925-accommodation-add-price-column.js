'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
        return Promise.all([
      queryInterface.addColumn('Accommodation', 
      'price', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
        return Promise.all([
      queryInterface.removeColumn('Accommodation', 'price')
    ]);
  }
};
