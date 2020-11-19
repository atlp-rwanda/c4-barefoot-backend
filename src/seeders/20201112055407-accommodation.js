export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Accommodation', [
    {
      id: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
      country: 'Rwanda',
      city: 'Kigali',
      state: 'Nyarugenge',
      streetAddress: 'KN 22 ST',
      locationID: 'c6028e0d-ef88-4693-ab49-f37669891724',
      propertyType: 'Hostel',
      numberOfRooms: 100,
      typeOfBed: 'Double Decker',
      title: 'Kigali Hostels',
      description: 'A serene environment for relaxation',
      photos: 'image.png'
    }
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Accommodation', null, {})

};
