import express from 'express';
import isLogedIn from '../../helper/isLogedIn';
import { getDirectReport,approve_reject_TravelRequest } from "../../controllers/directReport.controller";
import permit from '../../middlewares/accessControl';
import {sendRequestApprovalNotification} from '../../middlewares/pushNotification';
import approveRejectValidator from '../../middlewares/approveRejectValidator';


const router = express.Router()

// ----------------------- View direct report (Manager only) --------------------
/**
 * @swagger
 *
 * /api/v1/directReports:
 *    get:
 *      summary: A route used to get direct reports to the manager
 *      description: This route helps to get requests to be managed by a particular manager.
 *      tags: [ Direct reports]
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

router.get('/', isLogedIn, permit(["view direct reports travel requests"]), getDirectReport) 

/**
 * @swagger
 * 
 * /api/v1/directReports/{travelRequestId}:
 *    get:
 *      summary: A route used to get a single direct report to the manager
 *      description: This route helps to get one single request to be managed by a particular manager.
 *      tags: [ Direct reports]
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

router.get('/:travelId', isLogedIn, permit(["view direct reports travel requests"]), getDirectReport) // view direct reports

/**
 * @swagger
 *
 * /api/v1/directReports:
 *    put:
 *      summary: A route that allows the manager to approve or reject requester's travel requests
 *      tags: [Direct reports]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/directReports'
 *      responses:
 *        "201":
 *          description: The travel request is approved or rejected
 *        "400":
 *          description: travel request is already canceled or approved
 *        "404":
 *          description: Travel request does not exist!
 *        "500":
 *          description: Failed to approve or reject the travel request
 *
 * components:
 *    schemas:
 *      directReports:
 *        type: object
 *        required:
 *          - travelRequestId
 *          - action
 *        properties:
 *           travelRequestId:
 *             type: string
 *           action:
 *             type: string
 *      
 */
router.put('/',isLogedIn,approveRejectValidator,permit(["approve direct reports travel requests","reject direct reports travel requests"]), approve_reject_TravelRequest, sendRequestApprovalNotification)

export default router;
