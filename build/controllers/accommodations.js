"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookAccomodation = exports.deleteAccommodation = exports.updateAccommodation = exports.getOneAccommodation = exports.getAccommodations = exports.createAccommodation = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

require("express-async-errors");

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var _accommodations = _interopRequireDefault(require("../services/accommodations"));

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

var createAccommodation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var accommodation, amenity;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models["default"].Accommodation.create(req.body);

          case 3:
            accommodation = _context.sent;
            _context.next = 6;
            return _models["default"].Amenity.create({
              AccommodationId: accommodation.id
            });

          case 6:
            amenity = _context.sent;
            res.status(201).json({
              accommodation: accommodation
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function createAccommodation(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createAccommodation = createAccommodation;

var getAccommodations = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var page, accommodations;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = Number(req.query.page);
            _context2.prev = 1;
            _context2.next = 4;
            return _accommodations["default"].getAccommodation(page);

          case 4:
            accommodations = _context2.sent;

            if (accommodations) {
              _context2.next = 7;
              break;
            }

            throw new _notFoundRequestError["default"]('There are no accommodations available');

          case 7:
            res.status(200).json({
              status: 200,
              page: page,
              accommodations: accommodations
            });
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);
            next(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 10]]);
  }));

  return function getAccommodations(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAccommodations = getAccommodations;

var getOneAccommodation = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var id, singleAccommodation, amenities;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _accommodations["default"].getSingleAccommodation(id);

          case 4:
            singleAccommodation = _context3.sent;

            if (singleAccommodation) {
              _context3.next = 7;
              break;
            }

            throw new _notFoundRequestError["default"]('Accommodation does not exist');

          case 7:
            _context3.next = 9;
            return _models["default"].Amenity.findOne({
              where: {
                AccommodationId: id
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              }
            });

          case 9:
            amenities = _context3.sent;
            res.status(200).json({
              singleAccommodation: singleAccommodation,
              amenities: amenities
            });
            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](1);
            next(_context3.t0);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 13]]);
  }));

  return function getOneAccommodation(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getOneAccommodation = getOneAccommodation;

var updateAccommodation = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var accommodationExist, update;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _accommodations["default"].getSingleAccommodation(req.params.id);

          case 3:
            accommodationExist = _context4.sent;

            if (accommodationExist) {
              _context4.next = 6;
              break;
            }

            throw new _notFoundRequestError["default"]('Accommodation does not exist');

          case 6:
            _context4.next = 8;
            return _models["default"].Accommodation.update(req.body, {
              where: {
                id: req.params.id
              }
            });

          case 8:
            update = _context4.sent;
            res.status(201).json({
              status: 201,
              message: 'Accommodation successfully updated'
            });
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));

  return function updateAccommodation(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateAccommodation = updateAccommodation;

var deleteAccommodation = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var accommodationExist, checkTrips, updateTrips, dltAmenity, dltAccommodation;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _accommodations["default"].getSingleAccommodation(req.params.id);

          case 3:
            accommodationExist = _context5.sent;

            if (accommodationExist) {
              _context5.next = 6;
              break;
            }

            throw new _notFoundRequestError["default"]('Accommodation does not exist');

          case 6:
            _context5.next = 8;
            return _accommodations["default"].getSingleAccommodation(req.params.id);

          case 8:
            checkTrips = _context5.sent;

            if (!checkTrips) {
              _context5.next = 13;
              break;
            }

            _context5.next = 12;
            return _models["default"].Trip.update({
              AccommodationId: null
            }, {
              where: {
                AccommodationId: req.params.id
              }
            });

          case 12:
            updateTrips = _context5.sent;

          case 13:
            _context5.next = 15;
            return _models["default"].Amenity.destroy({
              where: {
                AccommodationId: req.params.id
              }
            });

          case 15:
            dltAmenity = _context5.sent;
            _context5.next = 18;
            return _models["default"].Accommodation.destroy({
              where: {
                id: req.params.id
              }
            });

          case 18:
            dltAccommodation = _context5.sent;
            res.status(201).json({
              status: 201,
              message: 'Accommodation has been deleted'
            });
            _context5.next = 25;
            break;

          case 22:
            _context5.prev = 22;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 22]]);
  }));

  return function deleteAccommodation(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteAccommodation = deleteAccommodation;

var bookAccomodation = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var accommodations, newRooms, user, booking, update;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _accommodations["default"].getSingleAccommodation(req.params.id);

          case 3:
            accommodations = _context6.sent;

            if (!(accommodations.numberOfRooms === 0)) {
              _context6.next = 6;
              break;
            }

            throw new _badRequestError["default"]('Accommodation is currently full');

          case 6:
            newRooms = accommodations.numberOfRooms - 1;
            _context6.next = 9;
            return (0, _tokenToData["default"])(req, res);

          case 9:
            user = _context6.sent;
            req.body.accommodationId = req.params.id;
            req.body.username = user.username;
            _context6.next = 14;
            return _models["default"].Booking.create(req.body);

          case 14:
            booking = _context6.sent;
            _context6.next = 17;
            return _models["default"].Accommodation.update({
              numberOfRooms: newRooms
            }, {
              where: {
                id: req.params.id
              }
            });

          case 17:
            update = _context6.sent;
            res.status(201).json({
              message: 'Booking successfully made',
              data: booking
            });
            _context6.next = 24;
            break;

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](0);
            next(_context6.t0);

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 21]]);
  }));

  return function bookAccomodation(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.bookAccomodation = bookAccomodation;