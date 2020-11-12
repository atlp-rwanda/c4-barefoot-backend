export default {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Locations', [
      {
        id: 'c6028e0d-ef88-4693-ab49-f37669891724',
        LocationName: 'Kigali',
        country: 'Rwanda',
        description: 'The land of a thousand hills',
        link: 'https://en.wikipedia.org/wiki/Kigali'
      }
    ]),
  
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Locations', null, {})
  
  };