'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID
      },
      sender: {
        type: DataTypes.UUID,
        allowNull:false
      },
      receiver: {
        type: DataTypes.UUID,
        allowNull:false
      },
      message: {
        type: DataTypes.TEXT
      },
      file: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Chats');
  }
};