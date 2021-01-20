
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Trips', 'AccommodationId' , 'accommodationId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Trips', 'AccommodationId' , 'accommodationId');
  }
};
