'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('TravelRequests', {
      travelId: {
        allowNull: false,
        default: DataTypes.fn('uuid_generate_v4'),
        primaryKey: true,
        type: DataTypes.UUID
      },
      managerId: {
        allowNull: false,
        type:DataTypes.UUID
      },
      userId: {
        allowNull: false,
        type:DataTypes.UUID
      },
      status: {
        allowNull: false,
        defaultValue: "pending",
        type:DataTypes.STRING
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('NOW')
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('NOW')
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('TravelRequests');
  }
};