'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TravelRequests', [
      {
        travelId:'0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
        managerId: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5', 
        userId: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc'
      },
    ], {});

    const travelRequests = await queryInterface.sequelize.query(
      'SELECT "travelId" from "TravelRequests";'
    );

    const travelRows = travelRequests[0];

    return await queryInterface.bulkInsert('Trips', [
      {
        tripId:'83b2a3e7-9ba4-3f4d-b3a3-d31940ee2edc',
        originCity: 'Kigali', 
        destination: 'Cairo', 
        tripDate: '2020-10-10', 
        returnDate: '2021-10-10', 
        accommodationId:'0ce36391-2c08-3074-bddb-a4ea8cccbbc5', 
        reason: "Trippin",
        travelId:'0ce36391-2c08-3074-bddb-a4ea8cccbbc5'
      },
      {
        tripId:'83b2a3e7-4ab9-3f4d-b3a3-d31940ee2edc',
        originCity: 'Kigali', 
        destination: 'Kampala', 
        tripDate: '2020-10-10', 
        returnDate: '2021-10-10', 
        accommodationId:'0ce36391-2c08-3074-bddb-a4ea8cccbbc5', 
        reason: "Trippin",
        travelId:'0ce36391-2c08-3074-bddb-a4ea8cccbbc5'
      },
      {
        tripId: '1a52f79e-568a-45b3-9151-4dfa40bb1217',
        originCity: 'Kigali',
        destination: 'Nairobi',
        tripDate: '2020-10-10',
        returnDate: '2021-10-10',
        accommodationId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc8',
        reason: 'Trippin',
        travelId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Trips', null, {});
    await queryInterface.bulkDelete('TravelRequests', null, {});
  }
};
