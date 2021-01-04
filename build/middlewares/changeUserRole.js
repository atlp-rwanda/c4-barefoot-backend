"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeUserRole = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _users = _interopRequireDefault(require("../services/users"));

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var _accessDenied = _interopRequireDefault(require("../utils/Errors/accessDenied"));

var _roles = _interopRequireDefault(require("../services/roles"));

var changeUserRole = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userEmail, findUser, findRoleById, changeRole, findRelations, _changeRole;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userEmail = req.body.email;
            _context.next = 4;
            return _users["default"].getUser({
              email: userEmail
            });

          case 4:
            findUser = _context.sent;

            if (!findUser) {
              _context.next = 25;
              break;
            }

            if (!(findUser.user_role_id !== null)) {
              _context.next = 15;
              break;
            }

            _context.next = 9;
            return _roles["default"].findRoleById({
              id: findUser.user_role_id
            });

          case 9:
            findRoleById = _context.sent;

            if (!(findRoleById.name === 'administrator')) {
              _context.next = 12;
              break;
            }

            throw new _accessDenied["default"]('Can not delete the administrator!');

          case 12:
            _context.next = 14;
            return _users["default"].changeRole({
              change: null,
              manager_id: findUser.id
            });

          case 14:
            changeRole = _context.sent;

          case 15:
            _context.next = 17;
            return _users["default"].findRelations({
              id: findUser.id
            });

          case 17:
            findRelations = _context.sent;

            if (!findRelations) {
              _context.next = 22;
              break;
            }

            _context.next = 21;
            return _users["default"].changeRole({
              change: null,
              manager_id: findUser.id
            });

          case 21:
            _changeRole = _context.sent;

          case 22:
            next();
            _context.next = 26;
            break;

          case 25:
            throw new _notFoundRequestError["default"]("".concat(userEmail, " does not exist!"));

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 28]]);
  }));

  return function changeUserRole(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.changeUserRole = changeUserRole;