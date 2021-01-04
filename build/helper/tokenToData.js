"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../services/user.service"));

var _auth = require("../utils/auth");

var getDataFromToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var authHeader, _authHeader, authString, token, authorization, user, userInfo;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.headers && req.headers.authorization)) {
              _context.next = 17;
              break;
            }

            // added these two lines to get a same auth header(Bearer Auth)
            authHeader = req.headers.authorization.split(' ');
            _authHeader = (0, _slicedToArray2["default"])(authHeader, 2), authString = _authHeader[0], token = _authHeader[1];
            authorization = token;
            _context.prev = 4;
            _context.next = 7;
            return (0, _auth.verifyToken)(authorization);

          case 7:
            user = _context.sent;
            userInfo = _user["default"].getUserByUserName(user.username);
            return _context.abrupt("return", userInfo);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](4);
            return _context.abrupt("return", res.status(401).json({
              message: 'session has expired, please login'
            }));

          case 15:
            _context.next = 18;
            break;

          case 17:
            return _context.abrupt("return", res.status(404).json({
              status: 404,
              message: 'No token found!'
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 12]]);
  }));

  return function getDataFromToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getDataFromToken;
exports["default"] = _default;