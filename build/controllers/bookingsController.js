"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var showBookings = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user, booking;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _tokenToData["default"])(req, res);

          case 3:
            user = _context.sent;
            _context.next = 6;
            return _models["default"].Booking.findAll({
              where: {
                username: user.username
              }
            });

          case 6:
            booking = _context.sent;

            if (booking[0]) {
              _context.next = 9;
              break;
            }

            throw new _notFoundRequestError["default"]('You do not have any bookings');

          case 9:
            res.status(200).json(booking);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function showBookings(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = showBookings;
exports["default"] = _default;