export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Amenities', [
    {
      id: 'cf701c80-a729-4922-a04c-553015514a96',
      accommodationId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Amenities', null, {})
};
