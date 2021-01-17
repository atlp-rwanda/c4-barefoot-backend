module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Amenities', {
      id: {
        allowNull: false,
        default: Sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      accommodationId: {
        allowNull: true,
        type: Sequelize.UUID,
        unique: true,
        references: {
          model: 'Accommodation',
          key: 'id',
          onDelete: 'cascade'
        },
      },
      wifi: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      airConditioner: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      shampoo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      ironing: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      tv: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      smokeDetector: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      fireExtinguisher: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lockOnDoor: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Amenities');
  }
};
