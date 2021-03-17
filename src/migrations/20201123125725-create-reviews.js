module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.fn('uuid_generate_v4')
      },
      userId: {
        allowNull:false,
        type: Sequelize.UUID,
        references:{
          model: 'Users',
          key:'id'
        }
      },
      AccommodationId: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'Accommodation',
          key: 'id',
          onDelete: 'cascade'
        }
      },
      rate: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      review: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Reviews');
  }
};