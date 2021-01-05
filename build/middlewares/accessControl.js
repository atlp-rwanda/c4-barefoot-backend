"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = permit;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _accessDenied = _interopRequireDefault(require("../utils/Errors/accessDenied"));

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var _roles = _interopRequireDefault(require("../services/roles"));

var _applicationError = _interopRequireDefault(require("../utils/Errors/applicationError"));

var _readData = _interopRequireDefault(require("../utils/readData"));

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

/* import index.json file */
var rolesData = _readData["default"].getPermissionsObject();

function permit(permission) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var tokenVerify, findRoleById, role, allowed, i;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _tokenToData["default"])(req, res);

            case 3:
              tokenVerify = _context.sent;
              _context.next = 6;
              return _roles["default"].findRoleById({
                id: tokenVerify.user_role_id
              });

            case 6:
              findRoleById = _context.sent;

              if (!findRoleById) {
                _context.next = 29;
                break;
              }

              role = findRoleById.name;
              /* check if this role exist */

              if (rolesData.hasOwnProperty(role)) {
                _context.next = 11;
                break;
              }

              throw new _notFoundRequestError["default"]('Role does not exist');

            case 11:
              allowed = !!permission.length;

              if (permission[0] === 'all') {
                permission = ['edit profile', 'create travel requests', 'view travel requests', 'edit travel requests', 'cancel travel requests', 'approve direct reports travel requests', 'view direct reports travel requests', 'reject direct reports travel requests', 'view accommodations', 'view locations', 'create accommodations', 'update accommodations', 'delete accommodations', 'book accommodations', 'create locations', 'update locations', 'delete locations'];
              }
              /* loop through permissions sent */


              i = 0;

            case 14:
              if (!(i < permission.length)) {
                _context.next = 22;
                break;
              }

              if (rolesData[role].hasOwnProperty(permission[i])) {
                _context.next = 17;
                break;
              }

              throw new _notFoundRequestError["default"]("Permission does not exist! [\"".concat(permission[i], "\"]"));

            case 17:
              if (allowed = !!rolesData[role][permission[i]]) {
                _context.next = 19;
                break;
              }

              return _context.abrupt("break", 22);

            case 19:
              i++;
              _context.next = 14;
              break;

            case 22:
              if (!allowed) {
                _context.next = 26;
                break;
              }

              next();
              _context.next = 27;
              break;

            case 26:
              throw new _accessDenied["default"]("You don't have permissions to [".concat(permission, "]"));

            case 27:
              _context.next = 30;
              break;

            case 29:
              throw new _applicationError["default"]('Failed to retrieve the user role, Try again later!');

            case 30:
              _context.next = 35;
              break;

            case 32:
              _context.prev = 32;
              _context.t0 = _context["catch"](0);
              next(_context.t0);

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 32]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}