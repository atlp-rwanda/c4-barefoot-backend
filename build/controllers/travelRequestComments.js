"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _badRequestError = _interopRequireDefault(require("../utils/Errors/badRequestError"));

var _tokenToData = _interopRequireDefault(require("../helper/tokenToData"));

var _createTravelRequestComment = require("../services/createTravelRequestComment");

var TravelRequestComment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var decoded, request_id, comment, commentBody;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _tokenToData["default"])(req, res, next);

          case 3:
            decoded = _context.sent;
            request_id = req.params.travelId;
            comment = req.body.comment;

            if (!request_id) {
              _context.next = 15;
              break;
            }

            if (!comment) {
              _context.next = 12;
              break;
            }

            commentBody = {
              userId: decoded.id,
              travelId: request_id,
              comment: comment
            };

            try {
              (0, _createTravelRequestComment.createTravelComment)(req, res, commentBody, next);
            } catch (err) {
              next(err);
            }

            _context.next = 13;
            break;

          case 12:
            throw new _badRequestError["default"]('You must provide comment');

          case 13:
            _context.next = 16;
            break;

          case 15:
            throw new _badRequestError["default"]('You must provide request id');

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function TravelRequestComment(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = TravelRequestComment;
exports["default"] = _default;