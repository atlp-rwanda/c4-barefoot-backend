"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _auth = require("../utils/auth");

var _findRoles = _interopRequireDefault(require("../services/findRoles"));

var _authorizationError = _interopRequireDefault(require("../utils/Errors/authorizationError"));

var isManager = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var bearerToken, token, decoded, roles;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bearerToken = req.headers.authorization;

            if (bearerToken) {
              _context.next = 3;
              break;
            }

            throw new _authorizationError["default"]('Unauthorized');

          case 3:
            token = bearerToken.split(' ')[1];
            _context.next = 6;
            return (0, _auth.verifyToken)(token);

          case 6:
            decoded = _context.sent;
            _context.next = 9;
            return (0, _findRoles["default"])(decoded.role);

          case 9:
            roles = _context.sent;

            if (!(roles.name !== 'manager')) {
              _context.next = 12;
              break;
            }

            throw new _authorizationError["default"]('Access denied');

          case 12:
            if (!(roles.name === 'manager')) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", next());

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isManager(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // user.user_role_id


var _default = isManager;
exports["default"] = _default;