module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.fn('uuid_generate_v4')
      },
      sender: {
        type: DataTypes.UUID,
        allowNull: false
      },
      receiver: {
        type: DataTypes.UUID,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: false,
        default: 'plain-text'
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
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
