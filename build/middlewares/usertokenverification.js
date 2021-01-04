"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _user = _interopRequireDefault(require("../services/user.service"));

var _auth = require("../utils/auth");

var _authorizationError = _interopRequireDefault(require("../utils/Errors/authorizationError"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

var _applicationError = _interopRequireDefault(require("../utils/Errors/applicationError"));

// verify user token
var verifyUserToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var authHeader, _authHeader, authString, token, decodedToken, record;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (req.headers.authorization) {
              _context.next = 3;
              break;
            }

            throw new _authorizationError["default"]('no auth header found', 401);

          case 3:
            authHeader = req.headers.authorization.split(' ');
            _authHeader = (0, _slicedToArray2["default"])(authHeader, 2), authString = _authHeader[0], token = _authHeader[1];

            if (!(authString !== 'Bearer')) {
              _context.next = 7;
              break;
            }

            throw new _authorizationError["default"]('no auth header found', 401);

          case 7:
            if (token) {
              _context.next = 9;
              break;
            }

            throw new _authorizationError["default"]('No token found', 401);

          case 9:
            _context.next = 11;
            return (0, _auth.verifyToken)(token);

          case 11:
            decodedToken = _context.sent;

            if (decodedToken) {
              _context.next = 14;
              break;
            }

            throw new _authorizationError["default"]('token can not be decoded', 401);

          case 14:
            _context.next = 16;
            return _user["default"].getUserByUserName(decodedToken.username);

          case 16:
            record = _context.sent;

            if (record) {
              _context.next = 19;
              break;
            }

            throw new _badRequestError["default"]('data in token is invalid', 400);

          case 19:
            _context.next = 21;
            return decodedToken.username;

          case 21:
            res.locals.token = _context.sent;

            if (res.locals.token) {
              _context.next = 24;
              break;
            }

            throw new _applicationError["default"]('server cant assign token', 500);

          case 24:
            next();
            _context.next = 30;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 27]]);
  }));

  return function verifyUserToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = verifyUserToken;
exports["default"] = _default;