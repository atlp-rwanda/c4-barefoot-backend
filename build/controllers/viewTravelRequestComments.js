"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

var _findTravelRequestComments = _interopRequireDefault(require("../services/findTravelRequestComments"));

var getTravelRequestComments = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var decoded, request_id, comment_id, userid, offset, limit, pagination, query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _tokenToData["default"])(req, res, next);

          case 2:
            decoded = _context.sent;

            try {
              request_id = req.params.requestId;
              comment_id = req.params.commentId;
              userid = decoded.id.toString();
              offset = req.query.from;
              limit = req.query.to;
              pagination = {
                offset: offset,
                limit: limit
              };
              query = '';

              if (comment_id) {
                query = {
                  travelId: request_id,
                  commentId: comment_id
                };
              } else if (request_id) {
                // get a specific travel request
                query = {
                  travelId: request_id
                };
              } else {
                // get all travel request
                query = {
                  userId: userid
                };
              }

              (0, _findTravelRequestComments["default"])(res, query, next, pagination);
            } catch (err) {
              next(err);
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTravelRequestComments(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getTravelRequestComments;
exports["default"] = _default;