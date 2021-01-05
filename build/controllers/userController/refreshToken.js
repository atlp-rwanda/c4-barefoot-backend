"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../services/user.service"));

var _badRequestError = _interopRequireDefault(require("../../utils/Errors/badRequestError"));

var _auth = require("../../utils/auth");

var refreshToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, payload, newUser, userData, userToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.cookies.make;
            _context.prev = 2;

            if (token) {
              _context.next = 5;
              break;
            }

            throw new _badRequestError["default"]('Please login!', 400);

          case 5:
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](2);
            next(_context.t0);

          case 10:
            _context.next = 12;
            return (0, _auth.verifyToken)(token);

          case 12:
            payload = _context.sent;
            _context.next = 15;
            return _user["default"].getUserByUserName(payload.username);

          case 15:
            newUser = _context.sent;
            userData = {
              username: newUser.username,
              user_role_id: newUser.user_role_id
            };

            if (newUser) {
              _context.next = 19;
              break;
            }

            throw new _badRequestError["default"]('no user found with this token', 400);

          case 19:
            userToken = (0, _auth.generateToken)(userData); // user.reftoken = reftoken;

            res.cookie('make', userToken, {
              httpOnly: false,
              path: '/api/v1/user/refresh-token'
            });
            return _context.abrupt("return", res.status(200).json({
              userToken: userToken
            }));

          case 24:
            _context.prev = 24;
            _context.t1 = _context["catch"](0);
            next(_context.t1);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 24], [2, 7]]);
  }));

  return function refreshToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = refreshToken;
exports["default"] = _default;