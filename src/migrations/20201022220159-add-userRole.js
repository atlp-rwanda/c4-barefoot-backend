module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'user_role_id', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 1
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'user_role');
  }
};
