
import express from 'express'
import isLogedIn from "../../helper/isLogedIn";
import { getDirectReport } from "../../controllers/directReport.controller";

const router = express.Router()

// ----------------------- View direct report (Manager only) --------------------
/**
 * @swagger
 * 
 * /api/v1/directReports:
 *    get:
 *      summary: A route used to get direct reports to the manager
 *      description: This route helps to get requests to be managed by a particular manager.
 *      tags: [Trip Request, Direct reports]
 *      responses:
 *        "200":
 *          description: The direct reports page returned successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/directReports'
 * 
 * components:
 *    schemas:
 *      directReports:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          data:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                 originCity: 
 *                   type: string
 *                 destination:
 *                   type: string
 *                 tripDate:
 *                   type: Date
 *                 returnDate:
 *                   type: Date
 *                 accommodationId:
 *                   type: integer
 *                 reason:
 *                   type: string
 *            example: 
 *              [{"travelId":12,status: "pending", "accommodationId": 123, "reason":tripping, "trip":{"originCity":Kigali, "destination":Cairo, "tripDate":11/12/2020, "returnDate":11/12/2021, "accommodationId":1234567, "reason":tripping}}]
 */

router.get('/', isLogedIn, getDirectReport) 
router.get('/:travelId', isLogedIn, getDirectReport) // view direct reports

export default router