module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('Bookings','checkedout',{
      
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
   );
    },

 down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bookings', 'checkedout');
  }
};
