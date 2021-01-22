'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Bookings', 'AccommodationId' , 'accommodationId');
    await queryInterface.renameColumn('Amenities', 'AccommodationId' , 'accommodationId');
    await queryInterface.renameColumn('Reviews', 'AccommodationId' , 'accommodationId');
    await queryInterface.renameColumn('Trips', 'AccommodationId' , 'accommodationId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Bookings', 'AccommodationId' , 'accommodationId');
    await queryInterface.renameColumn('Amenities', 'AccommodationId' , 'accommodationId');
    await queryInterface.renameColumn('Reviews', 'AccommodationId' , 'accommodationId');
    await queryInterface.renameColumn('Trips', 'AccommodationId' , 'accommodationId');
  }
};
