'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Bookings', 'AccommodationId' , 'accommodationId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Bookings', 'AccommodationId' , 'accommodationId');
  }
};
