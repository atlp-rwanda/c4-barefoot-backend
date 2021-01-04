"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../services/user.service"));

var _auth = require("../../utils/auth");

var _authorizationError = _interopRequireDefault(require("../../utils/Errors/authorizationError"));

var _badRequestError = _interopRequireDefault(require("../../utils/Errors/badRequestError"));

var _applicationError = _interopRequireDefault(require("../../utils/Errors/applicationError"));

var _notFoundRequestError = _interopRequireDefault(require("../../utils/Errors/notFoundRequestError"));

var verifyResetPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, _req$body, password, confirmPassword, decodedToken, record, updatePassword, updateToken;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.query.token;
            _req$body = req.body, password = _req$body.password, confirmPassword = _req$body.confirmPassword;
            _context.next = 5;
            return (0, _auth.verifyToken)(token);

          case 5:
            decodedToken = _context.sent;

            if (!(decodedToken.username === undefined)) {
              _context.next = 8;
              break;
            }

            throw new _authorizationError["default"]('Invalid Token');

          case 8:
            if (!(password !== confirmPassword)) {
              _context.next = 10;
              break;
            }

            throw new _badRequestError["default"]('Passwords do not match');

          case 10:
            _context.next = 12;
            return _user["default"].getUserByUserName(decodedToken.username);

          case 12:
            record = _context.sent;

            if (record) {
              _context.next = 15;
              break;
            }

            throw new _notFoundRequestError["default"]('Account does not exist');

          case 15:
            if (!(record.refreshtoken === token)) {
              _context.next = 17;
              break;
            }

            throw new _applicationError["default"]("Can not reset the password again! Token expired.");

          case 17:
            updatePassword = _user["default"].updateUserByUsername({
              password: password
            }, decodedToken.username);

            if (!updatePassword) {
              _context.next = 23;
              break;
            }

            //update the used token
            updateToken = _user["default"].updateUserByUsername({
              refreshtoken: token
            }, decodedToken.username);
            return _context.abrupt("return", res.status(200).json({
              status: 200,
              message: 'Password reset successfully'
            }));

          case 23:
            throw new _applicationError["default"]("Failed to reset this password, please Try again!");

          case 24:
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 26]]);
  }));

  return function verifyResetPassword(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = verifyResetPassword;
exports["default"] = _default;