"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _getNotifications = _interopRequireDefault(require("../../controllers/notification/getNotifications"));

var _updateNotification = _interopRequireDefault(require("../../controllers/notification/updateNotification"));

var router = _express["default"].Router();
/**
 * @swagger
 * /api/v1/notification/notifications:
 *   get:
 *     tags:
 *       - Get user's Notifcations
 *     summary: When user is loged in should get all notification related to him/her
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
 *             notifications:
 *               type: object
 *               description: retrieved notifications
 *
 */


router.get('/notifications', _getNotifications["default"]);
/**
 * @swagger
 * /api/v1/notification/notifications/:id:
 *   patch:
 *     tags:
 *       - Update notification
 *     summary: it requere to click on notification for updated
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
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
 *               example: Notification upadted successful
 *
 */

router.patch('/notifications/:id', _updateNotification["default"]);
var _default = router;
exports["default"] = _default;