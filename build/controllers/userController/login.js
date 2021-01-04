"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("express-async-errors");

var _findUser = _interopRequireDefault(require("../../services/findUser"));

var _applicationError = _interopRequireDefault(require("../../utils/Errors/applicationError"));

var _badRequestError = _interopRequireDefault(require("../../utils/Errors/badRequestError"));

var _notFoundRequestError = _interopRequireDefault(require("../../utils/Errors/notFoundRequestError"));

var _auth = require("../../utils/auth");

var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, email, password, isUser, result, userProfile, userData, userToken;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return (0, _findUser["default"])(email);

          case 3:
            isUser = _context.sent;

            if (!(isUser === null)) {
              _context.next = 6;
              break;
            }

            throw new _notFoundRequestError["default"]("You don't have an account with this email: ".concat(email), 404);

          case 6:
            if (!(isUser.verified === false)) {
              _context.next = 8;
              break;
            }

            throw new _applicationError["default"]('Please verify your email first', 403);

          case 8:
            result = (0, _auth.comparePassword)(password, isUser.password);

            if (result) {
              _context.next = 11;
              break;
            }

            throw new _badRequestError["default"]('Password incorrect', 400);

          case 11:
            _context.prev = 11;
            userProfile = {
              id: isUser.id,
              first_name: isUser.first_name,
              last_name: isUser.last_name,
              email: isUser.email,
              username: isUser.username,
              verified: isUser.verified,
              user_role_id: isUser.user_role_id,
              manager_id: isUser.manager_id,
              profile_picture: isUser.profile_picture,
              language: isUser.language,
              address: isUser.address,
              createdAt: isUser.createdAt,
              updatedAt: isUser.updatedAt
            };
            userData = {
              role: isUser.user_role_id,
              username: isUser.username
            };
            _context.next = 16;
            return (0, _auth.generateToken)(userData);

          case 16:
            userToken = _context.sent;
            _context.next = 19;
            return isUser.update({
              refreshtoken: userToken
            });

          case 19:
            res.cookie('make', userToken, {
              httpOnly: false,
              path: '/api/v1/user/refresh-token'
            });
            return _context.abrupt("return", res.status(200).json({
              status: 200,
              message: 'login successful',
              data: userToken,
              profile: userProfile
            }));

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](11);
            next(_context.t0);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 23]]);
  }));

  return function login(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = login;
exports["default"] = _default;