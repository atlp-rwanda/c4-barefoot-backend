'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        default: Sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      endpoint: {
        type: Sequelize.TEXT
      },
      expirationTime: {
        type: Sequelize.INTEGER
      },
      auth: {
        type: Sequelize.TEXT
      },
      p256dh: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.UUID
      },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subscriptions');
  }
};