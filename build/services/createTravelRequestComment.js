"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTravelComment = createTravelComment;

var _models = _interopRequireDefault(require("../models"));

function createTravelComment(req, res, query, next) {
  try {
    _models["default"].TravelComments.create(query).then(function (tCommentData) {
      res.status(200).json({
        message: "comment created successfully",
        tCommentData: tCommentData
      });
    })["catch"](function (err) {
      switch (err.parent.code) {
        case '23503':
          res.status(400).json({
            message: "Travel request with this id does not exist."
          });
          break;

        default:
          next(err);
      }
    });
  } catch (err) {
    next(err);
  }
}