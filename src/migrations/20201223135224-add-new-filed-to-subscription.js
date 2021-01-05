'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('subscriptions', 'auth', { type: Sequelize.TEXT });  
    await queryInterface.addColumn('subscriptions', 'p256dh', { type: Sequelize.TEXT });  
    await queryInterface.removeColumn('subscriptions', 'keys');

  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.removeColumn("subscriptions", "auth");
     await queryInterface.removeColumn("subscriptions", "p256dh");
     await queryInterface.addColumn('subscriptions', 'keys', { type: Sequelize.TEXT });  



  }
};
