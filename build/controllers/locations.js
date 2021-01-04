"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteLocation = exports.updateLocation = exports.getOneLocation = exports.createLocation = exports.getLocations = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

require("express-async-errors");

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

var _getLocations = _interopRequireDefault(require("../services/getLocations"));

var getLocations = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var page, locations;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = Number(req.query.page);
            _context.prev = 1;
            _context.next = 4;
            return (0, _getLocations["default"])(page);

          case 4:
            locations = _context.sent;

            if (locations) {
              _context.next = 7;
              break;
            }

            throw new _notFoundRequestError["default"]('There are no locations available');

          case 7:
            res.status(200).json({
              status: 200,
              page: page,
              locations: locations
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            next(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function getLocations(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getLocations = getLocations;

var createLocation = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var location;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models["default"].Location.create(req.body);

          case 3:
            location = _context2.sent;
            res.status(201).json({
              location: location
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function createLocation(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createLocation = createLocation;

var getOneLocation = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var id, singleLocation;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _models["default"].Location.findOne({
              where: {
                id: id
              }
            });

          case 4:
            singleLocation = _context3.sent;

            if (singleLocation) {
              _context3.next = 7;
              break;
            }

            throw new _notFoundRequestError["default"]('Location does not exist');

          case 7:
            res.status(200).json(singleLocation);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            next(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));

  return function getOneLocation(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getOneLocation = getOneLocation;

var updateLocation = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var locationExist, update;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models["default"].Location.findOne({
              where: {
                id: req.params.id
              }
            });

          case 3:
            locationExist = _context4.sent;

            if (locationExist) {
              _context4.next = 6;
              break;
            }

            throw new _notFoundRequestError["default"]('Location does not exist');

          case 6:
            _context4.next = 8;
            return _models["default"].Location.update(req.body, {
              where: {
                id: req.params.id
              }
            });

          case 8:
            update = _context4.sent;
            res.status(201).json({
              status: 201,
              message: 'Location successfully updated'
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

  return function updateLocation(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateLocation = updateLocation;

var deleteLocation = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var locationExist, linkedAccommodation, dltLocation;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _models["default"].Location.findOne({
              where: {
                id: req.params.id
              }
            });

          case 3:
            locationExist = _context5.sent;

            if (locationExist) {
              _context5.next = 6;
              break;
            }

            throw new _notFoundRequestError["default"]('Location does not exist');

          case 6:
            _context5.next = 8;
            return _models["default"].Accommodation.findOne({
              where: {
                locationID: req.params.id
              }
            });

          case 8:
            linkedAccommodation = _context5.sent;

            if (!linkedAccommodation) {
              _context5.next = 11;
              break;
            }

            throw new _badRequestError["default"]('This location can not be deleted with linked accomodations.');

          case 11:
            _context5.next = 13;
            return _models["default"].Location.destroy({
              where: {
                id: req.params.id
              }
            });

          case 13:
            dltLocation = _context5.sent;
            res.status(201).json({
              status: 201,
              message: 'Location has been deleted'
            });
            _context5.next = 20;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 17]]);
  }));

  return function deleteLocation(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteLocation = deleteLocation;