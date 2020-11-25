export default {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Bookings', [
      {
      id: '7103c3b2-2efa-457e-96c6-43a86ba6f46e',
      username: 'requesterOne',
      accommodationId:'0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
      From:'2020-10-10',
      To:'2021-10-10'
      }
    ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
