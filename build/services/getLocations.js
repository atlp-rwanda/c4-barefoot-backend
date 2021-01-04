"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var getLocations = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var page,
        pageSize,
        skip,
        locations,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;

            if (Number.isNaN(page)) {
              page = 1;
            }

            pageSize = 2;
            skip = (page - 1) * pageSize;
            _context.next = 6;
            return _models["default"].Location.findAndCountAll({
              limit: pageSize,
              offset: skip
            });

          case 6:
            locations = _context.sent;
            return _context.abrupt("return", locations);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getLocations() {
    return _ref.apply(this, arguments);
  };
}();

var _default = getLocations;
exports["default"] = _default;