module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Notifications','travelId',{
      
      allowNull: true,
      default: Sequelize.fn('uuid_generate_v4'),
      type: Sequelize.UUID
    },
 );
  },/**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  // },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('Notifications', 'travelId');/**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
