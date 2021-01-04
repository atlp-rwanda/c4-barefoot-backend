"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAllowedToReview = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

var _getBookings = require("../services/getBookings");

var _accessDenied = _interopRequireDefault(require("../utils/Errors/accessDenied"));

var isAllowedToReview = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var accommodationId, tokenVerify, hasBooked;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accommodationId = req.params.accommodationId;
            _context.prev = 1;
            _context.next = 4;
            return (0, _tokenToData["default"])(req, res);

          case 4:
            tokenVerify = _context.sent;

            if (!tokenVerify) {
              _context.next = 14;
              break;
            }

            _context.next = 8;
            return (0, _getBookings.getOneBooking)({
              username: tokenVerify.username,
              accommodationId: accommodationId
            });

          case 8:
            hasBooked = _context.sent;

            if (!hasBooked) {
              _context.next = 13;
              break;
            }

            next();
            _context.next = 14;
            break;

          case 13:
            throw new _accessDenied["default"]('Not allowed to review this accommodation');

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](1);
            next(_context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 16]]);
  }));

  return function isAllowedToReview(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.isAllowedToReview = isAllowedToReview;