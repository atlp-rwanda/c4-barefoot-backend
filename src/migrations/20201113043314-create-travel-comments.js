'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TravelComments', {
      commentId: {
        allowNull: false,
        primaryKey: true,
        default: Sequelize.fn('uuid_generate_v4'),
        type: Sequelize.UUID
      },
      userId: {
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
      comment: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('TravelComments');
  }
};