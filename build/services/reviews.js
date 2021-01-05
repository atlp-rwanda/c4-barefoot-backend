"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRatings = exports.createOne = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var createOne = function createOne(query) {
  var review = _models["default"].Review.create(query);

  return review;
};

exports.createOne = createOne;

var findRatings = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query, paginatedReviews) {
    var ratings;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            paginatedReviews.include = [{
              model: _models["default"].User,
              as: 'user',
              attributes: ['id', 'first_name', 'last_name']
            }];
            ratings = {};
            _context.next = 4;
            return _models["default"].Review.findAndCountAll({
              attributes: ["rate"],
              where: {
                accommodationId: query.accommodationId
              }
            });

          case 4:
            ratings.allRatings = _context.sent;
            _context.next = 7;
            return _models["default"].Review.findAndCountAll(paginatedReviews);

          case 7:
            ratings.reviews = _context.sent;
            _context.next = 10;
            return _models["default"].Review.findAndCountAll({
              attributes: ["rate"],
              where: {
                accommodationId: query.accommodationId,
                rate: 1
              }
            });

          case 10:
            ratings.oneStar = _context.sent;
            _context.next = 13;
            return _models["default"].Review.findAndCountAll({
              attributes: ["rate"],
              where: {
                accommodationId: query.accommodationId,
                rate: 2
              }
            });

          case 13:
            ratings.twoStar = _context.sent;
            _context.next = 16;
            return _models["default"].Review.findAndCountAll({
              attributes: ["rate"],
              where: {
                accommodationId: query.accommodationId,
                rate: 3
              }
            });

          case 16:
            ratings.threeStar = _context.sent;
            _context.next = 19;
            return _models["default"].Review.findAndCountAll({
              attributes: ["rate"],
              where: {
                accommodationId: query.accommodationId,
                rate: 4
              }
            });

          case 19:
            ratings.fourStar = _context.sent;
            _context.next = 22;
            return _models["default"].Review.findAndCountAll({
              attributes: ["rate"],
              where: {
                accommodationId: query.accommodationId,
                rate: 5
              }
            });

          case 22:
            ratings.fiveStar = _context.sent;
            return _context.abrupt("return", ratings);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findRatings(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findRatings = findRatings;