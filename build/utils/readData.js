"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _roles = _interopRequireDefault(require("../services/roles"));

exports.getPermissionsObject = function () {
  /* read data from index.json file */
  var existingData = _roles["default"].readFile();
  /* converting the data from buffer to json format */


  var roles = JSON.parse(existingData);
  return roles;
};