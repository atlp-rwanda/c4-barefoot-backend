"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _isLogedIn = _interopRequireDefault(require("../../helper/isLogedIn"));

var _directReport = require("../../controllers/directReport.controller");

var _travelRequestsValidation = _interopRequireDefault(require("../../middlewares/travelRequestsValidation"));

var _accessControl = _interopRequireDefault(require("../../middlewares/accessControl"));

var router = _express["default"].Router(); // ----------------------- View direct report (Manager only) --------------------

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


router.get('/', _isLogedIn["default"], (0, _accessControl["default"])(["view direct reports travel requests"]), _directReport.getDirectReport);
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

router.get('/:travelId', _isLogedIn["default"], (0, _accessControl["default"])(["view direct reports travel requests"]), _directReport.getDirectReport); // view direct reports

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

router.put('/', _isLogedIn["default"], _travelRequestsValidation["default"], (0, _accessControl["default"])(["approve direct reports travel requests", "reject direct reports travel requests"]), _directReport.approve_reject_TravelRequest);
var _default = router;
exports["default"] = _default;