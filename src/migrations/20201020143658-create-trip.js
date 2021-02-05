'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trips', {
      tripId: {
        allowNull: false,
        default: Sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      originCity: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      tripDate: {
        type: Sequelize.DATE
      },
      returnDate: {
        type: Sequelize.DATE
      },
      accommodationId: {
        type: Sequelize.UUID
      },
      travelId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'TravelRequests',
          key: 'travelId',
        },
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Trips');
  }
};