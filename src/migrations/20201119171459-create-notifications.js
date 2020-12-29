module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        default: Sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        allowNull: true,
        unique: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
          ondelete: 'cascade',
          onupdate: 'cascade'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'not readed'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Notifications');
  }
};
