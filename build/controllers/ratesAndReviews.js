"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReviews = exports.createReviews = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reviews = require("../services/reviews");

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

var _applicationError = _interopRequireDefault(require("../utils/Errors/applicationError"));

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var createReviews = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var query, tokenVerify, addReview;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = req.body;
            query.accommodationId = req.params.accommodationId;
            _context.prev = 2;
            _context.next = 5;
            return (0, _tokenToData["default"])(req, res);

          case 5:
            tokenVerify = _context.sent;

            if (!tokenVerify) {
              _context.next = 18;
              break;
            }

            query.userId = tokenVerify.id;
            _context.next = 10;
            return (0, _reviews.createOne)(query);

          case 10:
            addReview = _context.sent;

            if (!addReview) {
              _context.next = 15;
              break;
            }

            res.status(201).json({
              status: 201,
              message: 'Review added successfully!',
              data: addReview
            });
            _context.next = 16;
            break;

          case 15:
            throw new _applicationError["default"]('Failed to add a review', 500);

          case 16:
            _context.next = 19;
            break;

          case 18:
            throw new authorizationError("You're not authenticated! Please login.");

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](2);
            next(_context.t0);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 21]]);
  }));

  return function createReviews(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createReviews = createReviews;

var getReviews = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var accommodationId, page, limit, skip, paginatedReviews, findAllRatings, ratesData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            accommodationId = req.params.accommodationId;
            _context2.prev = 1;
            page = req.query.page || 1;
            limit = req.query.limit || 3;
            skip = page - 1 === -1 ? 0 : (page - 1) * limit;
            paginatedReviews = {
              offset: skip,
              limit: limit,
              attributes: ['rate', 'review']
            };
            _context2.next = 8;
            return (0, _reviews.findRatings)({
              accommodationId: accommodationId
            }, paginatedReviews);

          case 8:
            findAllRatings = _context2.sent;

            if (!findAllRatings) {
              _context2.next = 14;
              break;
            }

            if (findAllRatings.allRatings.count) {
              _context2.next = 12;
              break;
            }

            throw new _notFoundRequestError["default"]("No reviews found, be the first to rate this accommodation!");

          case 12:
            //calculating the average of rates
            ratesData = {
              totalRates: findAllRatings.allRatings.count,
              oneStar: "".concat((findAllRatings.oneStar.count * 100 / findAllRatings.allRatings.count).toFixed(0), "%"),
              twoStar: "".concat((findAllRatings.twoStar.count * 100 / findAllRatings.allRatings.count).toFixed(0), "%"),
              threeStar: "".concat((findAllRatings.threeStar.count * 100 / findAllRatings.allRatings.count).toFixed(0), "%"),
              fourStar: "".concat((findAllRatings.fourStar.count * 100 / findAllRatings.allRatings.count).toFixed(0), "%"),
              fiveStar: "".concat((findAllRatings.fiveStar.count * 100 / findAllRatings.allRatings.count).toFixed(0), "%")
            };
            return _context2.abrupt("return", res.status(200).json({
              status: 200,
              rates: ratesData,
              reviews: findAllRatings.reviews
            }));

          case 14:
            throw new _applicationError["default"]("Failed to load reviews, try again!");

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](1);
            next(_context2.t0);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 17]]);
  }));

  return function getReviews(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getReviews = getReviews;