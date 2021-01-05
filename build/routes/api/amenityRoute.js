"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _amenity = _interopRequireDefault(require("../../controllers/amenity"));

var _accessControl = _interopRequireDefault(require("../../middlewares/accessControl"));

var router = _express["default"].Router();
/**
 * @swagger
 *
 * /api/v1/amenities/{id}:
 *  patch:
 *    summary: This route updates a specific amenity with the specified ID
 *    tags: [Update one amenity]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      "201":
 *        description: The amenity is updated successfully
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/amenity'
 *
 *      "404":
 *        description: Error 404 is thrown when the amenity does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view amenities
 *
 *  components:
 *      schemas:
 *          amenity:
 *              type: object
 *              properties:
 *                  status:
 *                      type: integer
 *                      description: The HTTP status code
 *                      example: 201
 *                  message:
 *                      type: integer
 *                      description: A message indicating the operation was successfull
 *                      example: Amenity successfully updated
 */


router.patch('/:id', (0, _accessControl["default"])(['update accommodations']), _amenity["default"]);
var _default = router;
exports["default"] = _default;