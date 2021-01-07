"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.displayNumberOfTrips = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../models"));

var findTrip = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(res, query, location, offset, limit) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models["default"].Trip.findAndCountAll({
              limit: limit,
              offset: offset,
              where: {
                destination: location
              },
              include: [{
                model: _models["default"].TravelRequest,
                where: query
              }]
            });

          case 3:
            result = _context.sent;
            res.json({
              result: result
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).json(_context.t0.message));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function findTrip(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var displayNumberOfTrips = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(res, query) {
    var resultSet1;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            resultSet1 = [];
            _context2.next = 3;
            return _models["default"].TravelRequest.findAndCountAll({
              where: query
            }).then(function (tRequestDataSet) {
              if (tRequestDataSet.rows.length > 0) {
                var counter = tRequestDataSet.rows.length;
                tRequestDataSet.rows.forEach(function (tRequestData) {
                  _models["default"].Trip.findAll({
                    where: {
                      travelId: tRequestData.travelId
                    }
                  }).then(function (tripData) {
                    counter -= 1;
                    var result = tripData.map(function (a) {
                      return a.destination;
                    });
                    resultSet1.push(result);

                    if (tripData != null) {
                      if (counter === 0) {
                        var countedTrips = resultSet1.reduce(function (r, c) {
                          return r[c] = (r[c] || 0) + 1, r;
                        }, {});
                        res.json({
                          countedTrips: countedTrips
                        });
                      }
                    }
                  });
                });
              } else {
                res.status(404).json({
                  message: 'No trip Found'
                });
              }
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function displayNumberOfTrips(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.displayNumberOfTrips = displayNumberOfTrips;
var _default = findTrip;
exports["default"] = _default;