module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.fn('uuid_generate_v4')
      },
      username: {
        type: Sequelize.STRING,
      },
      accommodationId: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'Accommodation',
          key: 'id',
          onDelete: 'cascade'
        }
      },
      From: {
        type: Sequelize.DATE
      },
      To: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Bookings');
  }
};
