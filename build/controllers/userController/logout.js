"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var logout = function logout(req, res) {
  try {
    res.clearCookie('make', {
      path: '/api/v1/user/refresh-token'
    });
    res.status(200).json({
      status: 200,
      message: 'Logout successful!'
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

var _default = logout;
exports["default"] = _default;