"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var roles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var role;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].Role.findOne({
              where: {
                id: data
              }
            });

          case 2:
            role = _context.sent;
            return _context.abrupt("return", role);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function roles(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = roles;
exports["default"] = _default;