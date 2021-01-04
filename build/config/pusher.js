"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pusher = _interopRequireDefault(require("pusher"));

require("dotenv/config");

var pusher = new _pusher["default"]({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: process.env.USE_TLS
});
var _default = pusher;
exports["default"] = _default;