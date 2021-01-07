"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTotalOfTripsByLocation = exports.getTripHistory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

var _tripHistorySearch = _interopRequireWildcard(require("../services/tripHistorySearch"));

var getTripHistory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var decoded, userid, offset, limit, location, query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _tokenToData["default"])(req, res, next);

          case 2:
            decoded = _context.sent;
            userid = decoded.id.toString();
            offset = req.query.page;
            limit = req.query.limit;
            location = req.params.location;
            query = {
              userId: userid
            };
            (0, _tripHistorySearch["default"])(res, query, location, offset, limit);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTripHistory(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTripHistory = getTripHistory;

var getTotalOfTripsByLocation = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var decoded, userid, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _tokenToData["default"])(req, res, next);

          case 2:
            decoded = _context2.sent;
            _context2.prev = 3;
            userid = decoded.id.toString();
            query = {
              userId: userid
            };
            (0, _tripHistorySearch.displayNumberOfTrips)(res, query);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", res.status(401).json(_context2.t0.message));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 9]]);
  }));

  return function getTotalOfTripsByLocation(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getTotalOfTripsByLocation = getTotalOfTripsByLocation;