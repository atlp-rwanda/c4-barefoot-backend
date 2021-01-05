"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../services/user.service"));

var _notFoundRequestError = _interopRequireDefault(require("../../utils/Errors/notFoundRequestError"));

// get all users in database
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var page, options, record;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            page = req.query.page;
            options = {
              attributes: ['id', 'username', 'address'],
              page: page,
              // Default 1
              paginate: 5,
              // Default 25
              order: [['username', 'DESC']]
            };
            _context.next = 5;
            return _user["default"].getAllUsers(options);

          case 5:
            record = _context.sent;

            if (record) {
              _context.next = 8;
              break;
            }

            throw new _notFoundRequestError["default"]('no users found', 400);

          case 8:
            if (!(record.pages < page)) {
              _context.next = 10;
              break;
            }

            throw new _notFoundRequestError["default"]("only ".concat(record.pages, " pages available"), 404);

          case 10:
            res.status(200).json({
              status: 200,
              message: 'successful got all users',
              data: record
            });
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function getAllUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getAllUsers;
exports["default"] = _default;