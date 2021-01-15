import express from 'express';
import getStatistics from '../../controllers/statistics';
import isAdmin from '../../helper/isAdmin'

const router = express.Router();

/**
 * @swagger
 *
 * /api/v1/statistics:
 *    get:
 *      summary: A route that retrieve statistics of the system.
 *      description: this route should return the number of active users.
 *      tags: [Statistics Page]
 *      responses:
 *        "200":
 *          description: Statistics page has loaded
 *          content:
 *            application/json:
 *              schema:
 *                $ref: ''
 * components:
 *    schemas:
 *      Statistics:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          message:
 *            type: string
 *            description: Success message
 *            example: Welcome to Barefoot Nomad
 */
router.get('/', isAdmin, getStatistics)

export default router;