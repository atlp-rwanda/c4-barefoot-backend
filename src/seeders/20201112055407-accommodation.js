export default {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Accommodation', [
      {
        id: '7edd7f2c-6a67-4c85-ade2-abc6c962017b',
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