"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var manager = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var page,
        pageSize,
        skip,
        verifiedUserManager,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
            pageSize = 12;
            skip = parseInt((page - 1) * pageSize, 10);
            _context.next = 5;
            return _models["default"].User.findAndCountAll({
              offset: skip,
              limit: pageSize,
              where: {
                verified: true,
                user_role_id: data
              },
              attributes: {
                exclude: ['password', 'refreshtoken']
              },
              required: false
            });

          case 5:
            verifiedUserManager = _context.sent;
            return _context.abrupt("return", verifiedUserManager);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function manager(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = manager;
exports["default"] = _default;