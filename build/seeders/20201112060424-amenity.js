"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Amenities', [{
      id: 'cf701c80-a729-4922-a04c-553015514a96',
      AccommodationId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
      wifi: false,
      airConditioner: true,
      shampoo: false,
      ironing: true,
      tv: false,
      smokeDetector: true,
      fireExtinguisher: false,
      lockOnDoor: true
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Amenities', null, {});
  }
};
exports["default"] = _default;