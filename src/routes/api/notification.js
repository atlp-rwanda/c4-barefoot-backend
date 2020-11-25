import express from 'express';
import notifications from '../../controllers/notification/getNotifications';
import updateNotification from '../../controllers/notification/updateNotification';

const router = express.Router();

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
router.get('/notifications', notifications);

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
router.patch('/notifications/:id', updateNotification);
export default router;
