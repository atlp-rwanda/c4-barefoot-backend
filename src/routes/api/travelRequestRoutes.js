import express from 'express';
import isLogedIn from '../../helper/isLogedIn';
import { travelRequest, cancel_travelRequest } from '../../controllers/travelRequest.controller';
import { editTravelRequest, getTravelRequest } from '../../controllers/viewTravelRequest';
import { createTripValidation, editTripValidation } from '../../middlewares/tripRequestsValidation';
import travelRequestsValidation from '../../middlewares/travelRequestsValidation';
import permit from '../../middlewares/accessControl';

const router = express.Router();

// ----------------------- Make travelrequest --------------------
/**
 * @swagger
 *
 * /api/v1/requests/request:
 *    post:
 *      summary: A route used to send trip requests
 *      description: This route helps to send trip requests. Either one-way or mult-city travel request.
 *      tags: [Trip Request]
 *      responses:
 *        "200":
 *          description: The trip requests page worked properly
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/travelRequestSucces'
 *
 * components:
 *    schemas:
 *      travelReaquest:
 *        type: object
 *        required:
 *          - originCity
 *          - destination
 *          - tripDate
 *          - accommodationId
 *          - reason
 *        properties:
 *           originCity:
 *             type: string
 *           destination:
 *             type: string
 *           tripDate:
 *             type: Date
 *           returnDate:
 *             type: Date
 *           accommodationId:
 *             type: integer
 *           reason:
 *             type: string
 *
 *      travelRequestSucces:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          message:
 *            type: string
 *            description: Success message
 *            example: trip request sent successfully
 *          data:
 *            type: object
 *            description: Object returned
 *
 *        example:
 *          {"travelId":12,status: "pending", "accommodationId": 123, "reason":tripping, "trip":{"originCity":Kigali, "destination":Cairo, "tripDate":11/12/2020, "returnDate":11/12/2021, "accommodationId":1234567, "reason":tripping}}
 */
router.post('/request', isLogedIn, createTripValidation, permit(['create travel requests']), travelRequest); // make a request

// ----------------------- View travelrequest --------------------
/**
 * @swagger
 *
 * /api/v1/requests:
 *    get:
 *      summary: A route used to get trip requests
 *      description: This route helps to get trip requests made by a particular user. Either one-way or mult-city travel request.
 *      tags: [Trip Request]
 *      responses:
 *        "200":
 *          description: The trip requests page returned them successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/travelRequestList'
 *
 * components:
 *    schemas:
 *      travelRequestList:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          data:
 *            type: object
 *            description: Object returned
 *            properties:
 *              {originCity: Kigali,
 *              destination: Cairo,
 *              tripDate: 11/12/2020,
 *              returnDate: 11/12/2021,
 *              accommodationId: 1234567,
 *              reason: tripping}
 *            example:
 *              [{"travelId":12,status: "pending", "accommodationId": 123, "reason":tripping, "trip":{"originCity":Kigali, "destination":Cairo, "tripDate":11/12/2020, "returnDate":11/12/2021, "accommodationId":1234567, "reason":tripping}}]
 */
router.get('/', isLogedIn, permit(['view travel requests']), getTravelRequest); // view all requests

/**
 * @swagger
 *
 * /api/v1/requests:
 *    put:
 *      summary: A route that allows the requester to cancel the travel request
 *      tags: [Trip Request]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/cancelTravelRequest'
 *      responses:
 *        "201":
 *          description: The travel request is canceled
 *        "400":
 *          description: travel request is already canceled or approved
 *        "404":
 *          description: Travel request does not exist!
 *        "500":
 *          description: Failed to cancel the travel request
 *
 * components:
 *    schemas:
 *      cancelTravelRequest:
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

router.put('/', isLogedIn, travelRequestsValidation, permit(['cancel travel requests']), cancel_travelRequest);

// ----------------- View a particular travelrequest --------------------

/**
 * @swagger
 *
 * /api/v1/requests:
 *    get:
 *      summary: A route used to get one travel request made
 *      description: This route helps a requester or a manager to get  one travel request made. Either one-way or mult-city travel request.
 *      tags: [Trip Request]
 *      responses:
 *        "200":
 *          description: The trip request page returned them successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/travelRequestList'
 *
 * components:
 *    schemas:
 *      travelRequestList:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          data:
 *            type: object
 *            description: Object returned
 *            properties:
 *              {originCity: Kigali,
 *              destination: Cairo,
 *              tripDate: 11/12/2020,
 *              returnDate: 11/12/2021,
 *              accommodationId: 1234567,
 *              reason: tripping}
 *            example:
 *              [{"travelId":12,status: "pending", "accommodationId": 123, "reason":tripping, "trip":{"originCity":Kigali, "destination":Cairo, "tripDate":11/12/2020, "returnDate":11/12/2021, "accommodationId":1234567, "reason":tripping}}]
 */
router.get('/:requestId', isLogedIn, permit(['view travel requests']), getTravelRequest); // Get single request

/**
 * @swagger
 *
 * /api/v1/requests/{travelRequestId}:
 *    put:
 *      summary: A route that allows the requester or a manager to edit their own travel requests created previously.
 *      tags: [Trip Request]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/editTravelRequest'
 *      responses:
 *        "201":
 *          description: The travel request is updated
 *        "400":
 *          description: travel request is already approved
 *        "404":
 *          description: Trip id does not exist!
 *        "500":
 *          description: Failed to update the travel request
 *
 * components:
 *    schemas:
 *      editTravelRequest:
 *        type: object
 *        required:
 *          - tripId
 *          - updates
 *        properties:
 *           tripId:
 *             type: string
 *           updates:
 *             type: object
 *
 */

router.put('/:requestId', isLogedIn, editTripValidation, permit(['edit travel requests']), editTravelRequest);

export default router;

/**
 *
 * schemas:
 *      travelReaquest:
 *        type: object
 *        required:
 *          - originCity
 *          - destination
 *          - tripDate
 *          - accommodationId
 *          - reason
 *        properties:
 *           originCity:
 *             type: string
 *           destination:
 *             type: string
 *           tripDate:
 *             type: Date
 *           returnDate:
 *             type: Date
 *           accommodationId:
 *             type: integer
 *           reason:
 *             type: string
 */
