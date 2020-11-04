module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'address', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('users', 'language', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('users', 'profile_picture', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'address');
    await queryInterface.removeColumn('users', 'language');
    await queryInterface.removeColumn('users', 'profile_picture');
    await queryInterface.removeColumn('users', 'username');
  }
};
