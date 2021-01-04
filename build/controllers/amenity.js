"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

require("express-async-errors");

var _notFoundRequestError = _interopRequireDefault(require("../utils/Errors/notFoundRequestError"));

var updateAmenity = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var amenityExist, update;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models["default"].Amenity.findOne({
              where: {
                id: req.params.id
              }
            });

          case 3:
            amenityExist = _context.sent;

            if (amenityExist) {
              _context.next = 6;
              break;
            }

            throw new _notFoundRequestError["default"]('Amenity does not exist');

          case 6:
            _context.next = 8;
            return _models["default"].Amenity.update(req.body, {
              where: {
                id: req.params.id
              }
            });

          case 8:
            update = _context.sent;
            res.status(201).json({
              status: 201,
              message: 'Amenity successfully updated'
            });
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function updateAmenity(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = updateAmenity;
exports["default"] = _default;