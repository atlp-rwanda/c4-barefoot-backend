module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ChatVs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.fn('uuid_generate_v4')
      },
      visitor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      type: {
        type: Sequelize.TEXT,
        allowNull: false,
        default: 'plain-text'
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ChatVs');
  }
};
