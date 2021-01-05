"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var _badRequestError = _interopRequireDefault(require("../../utils/Errors/badRequestError"));

var _findUser = _interopRequireDefault(require("../../services/findUser"));

require("express-async-errors");

// Signup page controller
var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userExist, createUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _findUser["default"])(req.body.email);

          case 2:
            userExist = _context.sent;

            if (!userExist) {
              _context.next = 5;
              break;
            }

            throw new _badRequestError["default"]('Account already exists', 400);

          case 5:
            _context.prev = 5;
            _context.next = 8;
            return _models["default"].User.create(req.body);

          case 8:
            createUser = _context.sent;
            next();
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](5);
            next(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 12]]);
  }));

  return function signup(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = signup;
exports["default"] = _default;