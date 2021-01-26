import express from 'express';
import managerUsers from '../../controllers/managers';
import verifiedUser from '../../controllers/getVerifiedUsers';
import managerPermissions from '../../helper/managerPermissions';
import isManager from '../../helper/isManager';
import assignUsersToManagers from '../../controllers/assignUsersToManager';
import assignUsersToManagerValidation from '../../middlewares/assignUaserToManager';
import {managerAssignmentNotification} from '../../middlewares/pushNotification'
import  createNotification from '../../middlewares/createNotification';

const router = express.Router();
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
router.get('/verified-users', isManager, verifiedUser);

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
router.get('/verified-users/managers', isManager, managerUsers);

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
router.patch('/verified-users/:id', isManager, managerPermissions, assignUsersToManagerValidation, assignUsersToManagers, createNotification, managerAssignmentNotification);

export default router;
