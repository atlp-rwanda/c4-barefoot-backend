"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _travelRequestComments = _interopRequireDefault(require("../../controllers/travelRequestComments"));

var _viewTravelRequestComments = _interopRequireDefault(require("../../controllers/viewTravelRequestComments"));

var _isLogedIn = _interopRequireDefault(require("../../helper/isLogedIn"));

var router = _express["default"].Router();
/**
 * @swagger
 *
 * /api/v1/comment/:travelId:
 *    post:
 *      summary: A route used make comments on the travel request
 *      description: This route helps to to create comments Either one-way or mult-city travel request.
 *      tags: [Comments]
 *      responses:
 *        "200":
 *          description: The travel request comments page worked properly
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RequestCommentSucces'
 *
 * components:
 *    schemas:
 *      ReaquestComments:
 *        type: object
 *        required:
 *          - comment
 *        properties:
 *           comment:
 *             type: string
 *
 *      RequestCommentSucces:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          message:
 *            type: string
 *            description: Success message
 *            example: comment created successfully
 *          data:
 *            type: object
 *            description: Object returned
 *
 *        example:
 *          {
 *              "commentId": "c7db29c2-56e6-41b5-b436-c0e8b2f726e4",
                "userId": "83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc",
                "travelId": "0ce36391-2c08-3074-bddb-a4ea8cccbbc5",
                "comment": "Muraho!  Amakuru yanyu ra! --",
                "updatedAt": "2020-11-16T07:42:53.061Z",
                "createdAt": "2020-11-16T07:42:53.061Z"
            }
 */


router.post('/:travelId', _isLogedIn["default"], _travelRequestComments["default"]); // create travel request comment

/**
 * @swagger
 *
 * /api/v1/comment:
 *    get:
 *      summary: A route used to get travel request comments for a logged in user
 *      description: This route helps to get travel requests comments made by a particular user.
 *      tags: [Comments]
 *      responses:
 *        "200":
 *          description: The travel request comment page returned them successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/tRequestCommentsList'
 *
 * components:
 *    schemas:
 *      tRequestCommentsList:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          data:
 *            type: object
 *            properties:
 *              commentId: qwer
 *            example:
 *              [{
 *                   "commentId": "c7db29c2-56e6-41b5-b436-c0e8b2f726e4",
                    "userId": "83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc",
                    "travelId": "0ce36391-2c08-3074-bddb-a4ea8cccbbc5",
                    "comment": "Muraho!  Amakuru yanyu ra! --",
                    "updatedAt": "2020-11-16T07:42:53.061Z",
                    "createdAt": "2020-11-16T07:42:53.061Z"
                },
                {
 *                   "commentId": "c7db29c2-56e6-41b5-b436-c0e8b2f726e4",
                    "userId": "83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc",
                    "travelId": "0ce36391-2c08-3074-bddb-a4ea8cccbbc5",
                    "comment": "Muraho!  Amakuru yanyu ra! --",
                    "updatedAt": "2020-11-16T07:42:53.061Z",
                    "createdAt": "2020-11-16T07:42:53.061Z"
                }]
 */

router.get('/', _isLogedIn["default"], _viewTravelRequestComments["default"]);
/**
 * @swagger
 *
 * /api/v1/comment/:requestId/:
 *    get:
 *      summary: A route used to get comments of a particular request
 *      description: This route helps to get travel requests comments made on a particular travel request.
 *      tags: [Comments]
 *      responses:
 *        "200":
 *          description: The travel request comment page returned them successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/tRequestCommentsList'
 *
 * components:
 *    schemas:
 *      tRequestCommentsList:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          data:
 *            type: object
 *            example:
 *              [{
 *                   "commentId": "c7db29c2-56e6-41b5-b436-c0e8b2f726e4",
                    "userId": "83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc",
                    "travelId": "0ce36391-2c08-3074-bddb-a4ea8cccbbc5",
                    "comment": "Muraho!  Amakuru yanyu ra! --",
                    "updatedAt": "2020-11-16T07:42:53.061Z",
                    "createdAt": "2020-11-16T07:42:53.061Z"
                },
                {
 *                   "commentId": "c7db29c2-56e6-41b5-b436-c0e8b2f726e4",
                    "userId": "83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc",
                    "travelId": "0ce36391-2c08-3074-bddb-a4ea8cccbbc5",
                    "comment": "Muraho!  Amakuru yanyu ra! --",
                    "updatedAt": "2020-11-16T07:42:53.061Z",
                    "createdAt": "2020-11-16T07:42:53.061Z"
                }]
 */

router.get('/:requestId', _isLogedIn["default"], _viewTravelRequestComments["default"]);
/**
 * @swagger
 *
 * /api/v1/comment/:requestId/:commentId:
 *    get:
 *      summary: A route used to get a particular comment of a particular request
 *      description: This route helps to get travel requests comment made on a particular travel request.
 *      tags: [Comments]
 *      responses:
 *        "200":
 *          description: The travel request comment page returned them successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/tRequestComment'
 *
 * components:
 *    schemas:
 *      tRequestComment:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          data:
 *            type: object
 *            example:
 *              [{
 *                   "commentId": "c7db29c2-56e6-41b5-b436-c0e8b2f726e4",
                    "userId": "83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc",
                    "travelId": "0ce36391-2c08-3074-bddb-a4ea8cccbbc5",
                    "comment": "Muraho!  Amakuru yanyu ra! --",
                    "updatedAt": "2020-11-16T07:42:53.061Z",
                    "createdAt": "2020-11-16T07:42:53.061Z"
                }]
 */

router.get('/:requestId/:commentId', _isLogedIn["default"], _viewTravelRequestComments["default"]);
var _default = router;
exports["default"] = _default;