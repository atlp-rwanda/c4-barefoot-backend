"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _managers = _interopRequireDefault(require("../../controllers/managers"));

var _getVerifiedUsers = _interopRequireDefault(require("../../controllers/getVerifiedUsers"));

var _managerPermissions = _interopRequireDefault(require("../../helper/managerPermissions"));

var _isManager = _interopRequireDefault(require("../../helper/isManager"));

var _assignUsersToManager = _interopRequireDefault(require("../../controllers/assignUsersToManager"));

var _assignUaserToManager = _interopRequireDefault(require("../../middlewares/assignUaserToManager"));

var router = _express["default"].Router();
/**
 * @swagger
 * /api/v1/assignUserstoManager/verified-users:
 *   get:
 *     tags:
 *       - Verified Users
 *     summary: manager should get all verified users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success data
 *         schema:
 *           data:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               description: The http status code
 *               example: 200
 *             message:
 *               type: string
 *               description: success message
 *               example: verified users
 *             verifiedUsers:
 *               type: array
 *               description: retrieved data users
 *
 */


router.get('/verified-users', _isManager["default"], _getVerifiedUsers["default"]);
/**
 * @swagger
 * /api/v1/assignUserstoManager/verified-users/managers?page=1:
 *   get:
 *     tags:
 *       - Verified Manager
 *     summary: manager should get all verified Manager
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success data
 *         schema:
 *           data:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               description: The http status code
 *               example: 200
 *             message:
 *               type: string
 *               description: success message
 *               example: verified users
 *             verifiedUsers:
 *               type: array
 *               description: retrieved data users
 *
 */

router.get('/verified-users/managers', _isManager["default"], _managers["default"]);
/**
 * @swagger
 * /api/v1/assignUserstoManager/verified-users/:id:
 *   patch:
 *     tags:
 *       - Assign Verified users Manager
 *     summary: manager should get all verified Manager
 *     parameters:
 *       - in: body
 *         name: manager_id
 *         required: true
 *         schema:
 *          type: object
 *          required:
 *             - manager
 *          properties:
 *            manager_id:
 *              type: string
 *              description: manager id that will be assigned to user
 *              example: 38eb202c-3f67-4eed-b7ac-9c31bc226e0c
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success data
 *         schema:
 *           data:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               description: The http status code
 *               example: 200
 *             message:
 *               type: string
 *               description: success message
 *               example: verified users
 *             verifiedUsers:
 *               type: array
 *               description: retrieved data users
 *
 */

router.patch('/verified-users/:id', _isManager["default"], _managerPermissions["default"], _assignUaserToManager["default"], _assignUsersToManager["default"]);
var _default = router;
exports["default"] = _default;