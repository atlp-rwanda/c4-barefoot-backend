"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.cancelTravelRequestEmail = exports.approveTravelRequestEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _models = _interopRequireDefault(require("../models"));

require("dotenv/config");

require("express-async-errors");

var _auth = require("../utils/auth");

var _findUserById = _interopRequireDefault(require("../services/findUserById"));

var transporter = _nodemailer["default"].createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  // use SSL
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

var assignUserTomanagerEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
    var mailOptions, sendmail;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mailOptions = {
              from: "\"Barefoot Nomad\"<".concat(process.env.GMAIL_EMAIL, ">"),
              to: email,
              subject: 'Verify your email',
              html: '<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> You was assigned to a manager.</p> <br>'
            };
            _context.prev = 1;
            _context.next = 4;
            return transporter.sendMail(mailOptions);

          case 4:
            sendmail = _context.sent;
            console.log(sendmail);
            console.log(mailOptions.html);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0.message);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function assignUserTomanagerEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var approveTravelRequestEmail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, action) {
    var mailOptions, sendmail;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mailOptions = {
              from: "\"Barefoot Nomad\"<".concat(process.env.GMAIL_EMAIL, ">"),
              to: email,
              subject: 'Rejected travel request',
              html: "<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> Your travel request was ".concat(action, "d.</p> <br>")
            };
            _context2.prev = 1;
            _context2.next = 4;
            return transporter.sendMail(mailOptions);

          case 4:
            sendmail = _context2.sent;
            console.log(sendmail);
            console.log(mailOptions.html);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0.message);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function approveTravelRequestEmail(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.approveTravelRequestEmail = approveTravelRequestEmail;

var cancelTravelRequestEmail = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email, action) {
    var mailOptions, sendmail;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mailOptions = {
              from: "\"Barefoot Nomad\"<".concat(process.env.GMAIL_EMAIL, ">"),
              to: email,
              subject: 'Rejected travel request',
              html: "<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> You ".concat(action, "ed your travel request\n    .</p> <br>")
            };
            _context3.prev = 1;
            _context3.next = 4;
            return transporter.sendMail(mailOptions);

          case 4:
            sendmail = _context3.sent;
            console.log(sendmail);
            console.log(mailOptions.html);
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0.message);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));

  return function cancelTravelRequestEmail(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.cancelTravelRequestEmail = cancelTravelRequestEmail;
var _default = assignUserTomanagerEmail;
exports["default"] = _default;