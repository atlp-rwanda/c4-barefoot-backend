export default {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Bookings', [
      {
      id: '7103c3b2-2efa-457e-96c6-43a86ba6f46e',
      username: 'requesterOne',
      accommodationId:'0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
      From:'2020-10-10',
      To:'2021-10-10'
      },
      {
        id: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
        username: 'requesterOne',
        accommodationId:'0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
        From:'2020-10-10',
        To:'2021-10-10'
        },
        {
          id: '0ce36391-2c08-3074-bddb-a4ea8cccbbc6',
          username: 'requesterOne',
          accommodationId:'0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
          From:'2020-10-10',
          To:'2021-10-10'
          },
          {
            id: '0ce36391-2c08-3074-bddb-a4ea8cccbbd9',
            username: 'requesterOne',
            accommodationId:'0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
            From:'2020-10-10',
            To:'2021-10-10'
            },
            {
              id: 'cf701c80-a729-4922-a04c-553015514a96',
              username: 'requesterOne',
              accommodationId:'520f2b37-7bac-4490-aa7a-96f15915bcd7',
              From:'2020-10-10',
              To:'2021-10-10'
              },
              

    ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
