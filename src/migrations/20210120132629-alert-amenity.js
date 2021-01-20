'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Amenities', 'AccommodationId' , 'accommodationId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Amenities', 'AccommodationId' , 'accommodationId');
  }
};
