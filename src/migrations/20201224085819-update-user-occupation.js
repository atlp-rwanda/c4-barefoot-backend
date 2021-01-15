module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'occupation', {
        allowNull: true,
        type: Sequelize.STRING
      })
    ]);
  },

  down: (queryInterface,Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'occupation', {
        allowNull: true,
        type: Sequelize.STRING
      })
    ]);
  },
};