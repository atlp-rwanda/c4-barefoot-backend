"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Welcome page controller
var welcome = function welcome(req, res) {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Barefoot Nomad'
  });
};

var _default = welcome;
exports["default"] = _default;