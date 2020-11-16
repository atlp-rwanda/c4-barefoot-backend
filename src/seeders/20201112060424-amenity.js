export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Amenities', [
    {
      id: 'cf701c80-a729-4922-a04c-553015514a96',
      accommodationID: '7edd7f2c-6a67-4c85-ade2-abc6c962017b',
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
