import Sequelize from 'sequelize';
module.exports = {
  up: (queryInterface, Sequelize) => {
     return Promise.all([
      queryInterface.changeColumn('Users', 'password', {
        allowNull: true,
        type: Sequelize.STRING
      })
    ]);
  },

  down: (queryInterface,Sequelize) =>{
    return Promise.all([
      queryInterface.changeColumn('Users', 'password', {
        allowNull: true
      })
    ]);
  }
}
