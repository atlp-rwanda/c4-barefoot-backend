"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResetPasswordEmail = exports.sendVerificationEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

require("express-async-errors");

var _auth = require("../utils/auth");

var _applicationError = _interopRequireDefault(require("../utils/Errors/applicationError"));

var _sendEmail = _interopRequireDefault(require("../helper/sendEmail"));

var _user = _interopRequireDefault(require("../services/user.service"));

var sendVerificationEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, first_name, username, email, accessToken, userInfo, sendmail;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, first_name = _req$body.first_name, username = _req$body.username, email = _req$body.email;
            accessToken = (0, _auth.generateToken)({
              username: username
            });
            userInfo = {
              email: email,
              subject: 'Verify your email',
              html: "<p>Welcome to Barefoot Nomad, Click on the link below to verify your email.</p> <br> <a href='".concat(process.env.FRONTEND_URL, "/user/verification?token=").concat(accessToken, "'>Link</a>")
            };
            _context.next = 5;
            return (0, _sendEmail["default"])(userInfo);

          case 5:
            sendmail = _context.sent;
            _context.prev = 6;

            if (!sendmail) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(201).json({
              Message: "User ".concat(first_name, " has been created. Check email for verification")
            }));

          case 11:
            throw new _applicationError["default"]("Failed to send the verification email, please try again!", 500);

          case 12:
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](6);
            next(_context.t0.message);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 14]]);
  }));

  return function sendVerificationEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendVerificationEmail = sendVerificationEmail;

var sendResetPasswordEmail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var email, userFound, resetToken, userInfo, sendmail;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            email = req.body.email;
            _context2.next = 4;
            return _user["default"].getUserByEmail(email);

          case 4:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              status: 404,
              error: 'User not found'
            }));

          case 7:
            if (userFound.verified) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              status: 401,
              error: 'Account not verified'
            }));

          case 9:
            resetToken = (0, _auth.generateToken)({
              username: userFound.username
            });
            userInfo = {
              email: email,
              subject: 'Reset your password',
              html: "<p>Hello, you requested to reset your password on Barefoot Nomad, Click on the link below to enter new password.</p> <br> <a href='".concat(process.env.FRONTEND_URL, "/user/reset-password?token=").concat(resetToken, "'><b>Reset password Link</b></a>")
            };
            _context2.next = 13;
            return (0, _sendEmail["default"])(userInfo);

          case 13:
            sendmail = _context2.sent;

            if (!sendmail) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              status: 200,
              message: 'Request sent successfully, please check your email to reset your password'
            }));

          case 18:
            throw new _applicationError["default"]("Failed to send the reset email, please try again!", 500);

          case 19:
            _context2.next = 24;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 21]]);
  }));

  return function sendResetPasswordEmail(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.sendResetPasswordEmail = sendResetPasswordEmail;