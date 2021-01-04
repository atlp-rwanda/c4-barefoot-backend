"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

require("dotenv/config");

var sendEmail = function sendEmail(userInfo) {
  var transporter = _nodemailer["default"].createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // use SSL
    auth: {
      type: "loggin",
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: "\"Barefoot Nomad\"<".concat(process.env.GMAIL_EMAIL, ">"),
    to: userInfo.email,
    subject: userInfo.subject,
    html: userInfo.html
  };

  try {
    var sendmail = transporter.sendMail(mailOptions);
    return sendmail;
  } catch (err) {
    return err;
    ;
  }
};

var _default = sendEmail;
exports["default"] = _default;