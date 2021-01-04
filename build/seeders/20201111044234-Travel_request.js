'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var travelRequests, travelRows;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.bulkInsert('TravelRequests', [{
                travelId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
                managerId: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
                userId: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc'
              }], {});

            case 2:
              _context.next = 4;
              return queryInterface.sequelize.query('SELECT "travelId" from "TravelRequests";');

            case 4:
              travelRequests = _context.sent;
              travelRows = travelRequests[0];
              _context.next = 8;
              return queryInterface.bulkInsert('Trips', [{
                tripId: '83b2a3e7-9ba4-3f4d-b3a3-d31940ee2edc',
                originCity: 'Kigali',
                destination: 'Cairo',
                tripDate: '2020-10-10',
                returnDate: '2021-10-10',
                AccommodationId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
                reason: "Trippin",
                travelId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5'
              }, {
                tripId: '83b2a3e7-4ab9-3f4d-b3a3-d31940ee2edc',
                originCity: 'Kigali',
                destination: 'Kampala',
                tripDate: '2020-10-10',
                returnDate: '2021-10-10',
                AccommodationId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
                reason: "Trippin",
                travelId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5'
              }, {
                tripId: '1a52f79e-568a-45b3-9151-4dfa40bb1217',
                originCity: 'Kigali',
                destination: 'Nairobi',
                tripDate: '2020-10-10',
                returnDate: '2021-10-10',
                AccommodationId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc8',
                reason: 'Trippin',
                travelId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5'
              }, {
                tripId: 'aeebcf33-d125-44ce-b8c1-f5d5e8b75f13',
                originCity: 'Kigali',
                destination: 'Nairobi',
                tripDate: '2020-10-10',
                returnDate: '2021-10-10',
                AccommodationId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc8',
                reason: 'Trippin',
                travelId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5'
              }], {});

            case 8:
              return _context.abrupt("return", _context.sent);

            case 9:
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
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return queryInterface.bulkDelete('Trips', null, {});

            case 2:
              _context2.next = 4;
              return queryInterface.bulkDelete('TravelRequests', null, {});

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};