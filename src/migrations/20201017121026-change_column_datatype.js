module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'users',
      'first_name',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );

    await queryInterface.changeColumn(
      'users',
      'last_name',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );

    await queryInterface.changeColumn(
      'users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    );

    await queryInterface.changeColumn(
      'users',
      'password',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );

    await queryInterface.changeColumn(
      'users',
      'verified',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'users',
      'first_name',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.changeColumn(
      'users',
      'last_name',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.changeColumn(
      'users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      }
    );

    await queryInterface.changeColumn(
      'users',
      'password',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

    await queryInterface.changeColumn(
      'users',
      'verified',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    );
  }
};
