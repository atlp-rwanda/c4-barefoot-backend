'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trips', 'destinationId', {
      type: Sequelize.UUID,
      allowNull: true,
    }, {
      after: 'destination',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trips', 'destionationId', {
      type: Sequelize.STRING,
      allowNull: true,
    }, {
      after: 'destination',
    });
  }
};
