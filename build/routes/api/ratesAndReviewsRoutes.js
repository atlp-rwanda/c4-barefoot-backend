"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _ratesAndReviews = require("../../controllers/ratesAndReviews");

var _isAllowedToReview = require("../../middlewares/isAllowedToReview");

var _reviewValidation = _interopRequireDefault(require("../../middlewares/reviewValidation"));

var _isLogedIn = _interopRequireDefault(require("../../helper/isLogedIn"));

var router = _express["default"].Router();
/**
 * @swagger
 *
 * /api/v1/ratings/{accommodationId}:
 *  post:
 *    summary: This route helps a requester or a manager to rate and review on the accommodation they booked
 *    tags: [Rate & Review]
 *    parameters:
 *      - in: path
 *        name: accommodationId
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/rate'
 *    responses:
 *      "201":
 *        description: The review is successfully made.
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/rate'
 *
 *      "403":
 *        description: Error 403 is thrown when the user not allowed to review the accommodation
 *      "500":
 *        description: When the failed to add the review.
 *
 *  components:
 *    schemas:
 *      rate:
 *        type: object
 *        properties:
 *                rate:
 *                     type: integer
 *                     description: The rate to add on the accommodation from 1 up to 5
 *                     example: 5
 *                review:
 *                     type: string
 *                     description: The description of your ratings
 *                     example: This house is very nice and clean
 *                
 */


router.post('/:accommodationId', _reviewValidation["default"], _isAllowedToReview.isAllowedToReview, _ratesAndReviews.createReviews);
/**
 * @swagger
 *
 * /api/v1/ratings/{accommodationId}:
 *  get:
 *    summary: This route retrieves reviews for a specific accommodation with the specified ID
 *    tags: [Rate & Review]
 *    parameters:
 *      - in: path
 *        name: accommodationId
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      "200":
 *        description: Returns a paginated list of reviews made one the accommodation      
 *      "404":
 *        description: Error 404 is thrown when the accommodation has on reviews or ratings yet
 *      "500":
 *        description: When the application failed to retrieve reviews
 *
 */

router.get('/:accommodationId', _isLogedIn["default"], _ratesAndReviews.getReviews);
var _default = router;
exports["default"] = _default;