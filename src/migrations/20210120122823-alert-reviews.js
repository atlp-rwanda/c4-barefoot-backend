'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Reviews', 'AccommodationId' , 'accommodationId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Reviews', 'AccommodationId' , 'accommodationId');
  }
};
