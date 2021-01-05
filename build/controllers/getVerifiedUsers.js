"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _findVerifiedUsers = _interopRequireDefault(require("../services/findVerifiedUsers"));

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var verifiedUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var page, verifiedUsers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = req.query.page;
            _context.next = 3;
            return (0, _findVerifiedUsers["default"])(page);

          case 3:
            verifiedUsers = _context.sent;

            if (verifiedUsers) {
              _context.next = 6;
              break;
            }

            throw new _notFoundRequestError["default"]('No verified users found', 404);

          case 6:
            return _context.abrupt("return", res.status(200).json({
              status: 200,
              message: 'verified users',
              page: page,
              verifiedUsers: verifiedUsers
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifiedUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = verifiedUser;
exports["default"] = _default;