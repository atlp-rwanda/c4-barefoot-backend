"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", queryInterface.bulkInsert('Accommodation', [{
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
              }, {
                id: '520f2b37-7bac-4490-aa7a-96f15915bcd7',
                country: 'Rwanda',
                city: 'Kigali',
                state: 'Nyarugenge',
                streetAddress: 'KN 22 ST',
                locationID: 'c6028e0d-ef88-4693-ab49-f37669891724',
                propertyType: 'Hostel',
                numberOfRooms: 0,
                typeOfBed: 'Double Decker',
                title: 'Kigali Hostels',
                description: 'A serene environment for relaxation',
                photos: 'image.png'
              }]));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Accommodation', null, {});
  }
};
exports["default"] = _default;