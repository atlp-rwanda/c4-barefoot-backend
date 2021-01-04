"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var isLogedIn = function isLogedIn(req, res, next) {
  var bearerToken = req.headers.authorization;
  if (!bearerToken) return res.status(401).json({
    status: 401,
    message: 'You are not loged in'
  });
  return next();
};

var _default = isLogedIn;
exports["default"] = _default;