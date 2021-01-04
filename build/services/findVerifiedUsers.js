"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var isUserVerified = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var page,
        pageSize,
        skip,
        verifiedUser,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;
            pageSize = 2;
            skip = parseInt((page - 1) * pageSize, 10);
            _context.next = 5;
            return _models["default"].User.findAndCountAll({
              limit: pageSize,
              offset: skip,
              where: {
                verified: true
              },
              attributes: {
                exclude: ['password', 'refreshtoken']
              },
              required: false
            });

          case 5:
            verifiedUser = _context.sent;
            return _context.abrupt("return", verifiedUser);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isUserVerified() {
    return _ref.apply(this, arguments);
  };
}();

var _default = isUserVerified;
exports["default"] = _default;