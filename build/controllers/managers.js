"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _roles = require("../services/roles");

var _findManager = _interopRequireDefault(require("../services/findManager"));

var assignUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var page, storedRole;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            page = parseInt(req.query.page, 10);
            _context2.next = 4;
            return (0, _roles.roles)();

          case 4:
            storedRole = _context2.sent;
            storedRole.filter( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(rol) {
                var data, manager;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(rol.name === 'manager')) {
                          _context.next = 6;
                          break;
                        }

                        data = rol.id;
                        _context.next = 4;
                        return (0, _findManager["default"])(data, page);

                      case 4:
                        manager = _context.sent;
                        return _context.abrupt("return", res.status(200).json({
                          status: 200,
                          message: 'available managers',
                          page: page,
                          managers: manager
                        }));

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function assignUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = assignUsers;
exports["default"] = _default;