'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn('subscriptions', 'auth', { type: Sequelize.TEXT });  
    await queryInterface.changeColumn('subscriptions', 'p256dh', { type: Sequelize.TEXT });
    await queryInterface.changeColumn('subscriptions', 'endpoint', { type: Sequelize.TEXT });


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('subscriptions', 'auth', { type: Sequelize.STRING });  
    await queryInterface.changeColumn('subscriptions', 'p256dh', { type: Sequelize.STRING });
    await queryInterface.changeColumn('subscriptions', 'endpoint', { type: Sequelize.STRING });

  }
};
