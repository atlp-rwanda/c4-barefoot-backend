"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userprofile = require("../../controllers/userController/userprofile");

var _usertokenverification = _interopRequireDefault(require("../../middlewares/usertokenverification"));

var _updateprofileinputsvalidation = _interopRequireDefault(require("../../middlewares/updateprofileinputsvalidation"));

var _accessControl = _interopRequireDefault(require("../../middlewares/accessControl"));

var router = _express["default"].Router();
/**
 * @swagger
 *
 * /api/v1/profile/update-profile:
 *    patch:
 *      summary: update user profile end point
 *      description: This endpoint is used to update user profile.
 *      tags: [update user profile]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/updateProfile'
 *      responses:
 *        "200":
 *          description: user profile is successful updated
 *        "400":
 *          description: failed to update
 *        "404":
 *          description: provided data is not valid
 * components:
 *    schemas:
 *      updateProfile:
 *        type: object
 *        required:
 *          - first_name
 *          - last_name
 *          - username
 *          - occupation
 *          - address
 *          - language
 *          - profile_picture
 *        properties:
 *          first_name:
 *              type: string
 *          last_name:
 *              type: string
 *          password:
 *              type: string
 *          username:
 *              type: string
 *          occupation:
 *              type: string
 *          address:
 *              type: string
 *          language:
 *              type: string
 *          profile_picture:
 *              type: string
 */
// ------------------ update user profile --------


router.patch('/update-profile', _usertokenverification["default"], _updateprofileinputsvalidation["default"], (0, _accessControl["default"])(["edit profile"]), _userprofile.updateUserProfile);
/**
 * @swagger
 *
 * /api/v1/profile/{username}:
 *    get:
 *      summary: getting user profile end point
 *      description: This endpoint is used to retrieve user profile.
 *      tags: [get user profile]
 *      parameters:
 *        - in: path
 *          name: username
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: user profile is successful retrieved
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userProfile'
 *        "404":
 *          description: no user found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/notFound'
 * components:
 *    schemas:
 *      userProfile:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *          Message:
 *            type: string
 *            description: Success message
 *        example:
 *          status: 200
 *          message: successful got user profile
 *      notFound:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *          error:
 *            type: string
 *            description: The error message
 *        example:
 *          status: 404
 *          message: user not found
 */
// ------------------ get user profile -----------

router.get('/:username', _usertokenverification["default"], _userprofile.getUserProfile);
var _default = router;
exports["default"] = _default;