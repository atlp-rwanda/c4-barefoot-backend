"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _locations = require("../../controllers/locations");

var _accessControl = _interopRequireDefault(require("../../middlewares/accessControl"));

var router = _express["default"].Router();
/**
 * @swagger
 *
 * /api/v1/locations:
 *  get:
 *    summary: A route that allows the Travel Admin to perform CRUD operations on locations.
 *    tags: [Locations]
 *    parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page query is used for pagination
 *    responses:
 *      "200":
 *        description: Returns the first 2 locations
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/locations'
 *
 *      "404":
 *        description: Error 404 is thrown when no locations are available
 *      "403":
 *        description: Unauthorised users are not allowed to view locations
 *
 *  components:
 *    schemas:
 *      locations:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *            example: 200
 *          page:
 *            type: integer
 *            description: The page of locations which you are currently on (Pagination)
 *            example: 1
 *          locations:
 *            type: object
 *            description: An object containing locations retrieved from the database
 *            properties:
 *              count:
 *                type: integer
 *                description: The number of locations available in the database
 *                example: 1
 *              rows:
 *                type: array
 *                description: An array of retrieved locations. Each item is a location.
 *                items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: A unique UUID v4 of the user
 *                        example: 952595eb-b193-4391-9196-6840f7ad293d
 *                      LocationName:
 *                        type: string
 *                        description: The name of the location
 *                        example: Kigali
 *                      country:
 *                        type: string
 *                        description: The country where the location is
 *                        example: Rwanda
 *                      description:
 *                        type: string
 *                        description: A short description about the location
 *                        example: The land of a thousand hills
 *                      link:
 *                        type: string
 *                        description: A link to a video or wiki with more info about the location
 *                        example: https://en.wikipedia.org/wiki/Kigali
 *
 *
 */


router.get('/', (0, _accessControl["default"])(['view locations']), _locations.getLocations);
/**
 * @swagger
 *
 * /api/v1/locations/{id}:
 *  get:
 *    summary: This route retrieves a specific location with the specified ID
 *    tags: [One Location]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      "200":
 *        description: Returns one location
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/location'
 *
 *      "404":
 *        description: Error 404 is thrown when the location does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view locations
 *
 *  components:
 *    schemas:
 *      location:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: A unique UUID v4 of the user
 *            example: 952595eb-b193-4391-9196-6840f7ad293d
 *          LocationName:
 *            type: string
 *            description: The name of the location
 *            example: Kigali
 *          country:
 *            type: string
 *            description: The country where the location is
 *            example: Rwanda
 *          description:
 *            type: string
 *            description: A short description about the location
 *            example: The land of a thousand hills
 *          link:
 *            type: string
 *            description: A link to a video or wiki with more info about the location
 *            example: https://en.wikipedia.org/wiki/Kigali
 *
 *
 */

router.get('/:id', (0, _accessControl["default"])(['view locations']), _locations.getOneLocation);
/**
 * @swagger
 *
 * /api/v1/locations/{id}:
 *  patch:
 *    summary: This route updates a specific location with the specified ID
 *    tags: [Update one location]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      "201":
 *        description: The location is updated successfully
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/location'
 *
 *      "404":
 *        description: Error 404 is thrown when the location does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view locations
 *
 *  components:
 *      schemas:
 *          location:
 *              type: object
 *              properties:
 *                  status:
 *                      type: integer
 *                      description: The HTTP status code
 *                      example: 201
 *                  message:
 *                      type: integer
 *                      description: A message indicating the operation was successfull
 *                      example: Location successfully updated
 */

router.patch('/:id', (0, _accessControl["default"])(['update locations']), _locations.updateLocation);
/**
 * @swagger
 *
 * /api/v1/locations/{id}:
 *  delete:
 *    summary: This route deletes a specific location with the specified ID
 *    tags: [Delete one location]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      "201":
 *        description: The location is deleted successfully
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/location'
 *
 *      "404":
 *        description: Error 404 is thrown when the location does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view locations
 *
 *  components:
 *    schemas:
 *        location:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: The HTTP status code
 *                  example: 201
 *              message:
 *                  type: integer
 *                  description: A message indicating the operation was successfull
 *                  example: Location has been deleted
 */

router["delete"]('/:id', (0, _accessControl["default"])(['delete locations']), _locations.deleteLocation);
/**
 * @swagger
 *
 * /api/v1/locations:
 *  post:
 *    summary: This is used to create locations
 *    tags: [Create a location]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/location'
 *    responses:
 *      "201":
 *        description: The location is successfully created
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/location'
 *
 *      "404":
 *        description: Error 404 is thrown when the location does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view locations
 *
 *  components:
 *      schemas:
 *          location:
 *              type: object
 *              properties:
 *                  LocationName:
 *                      type: string
 *                      description: The name of the location
 *                      example: Kigali
 *                  country:
 *                      type: string
 *                      description: The country where the location is
 *                      example: Rwanda
 *                  description:
 *                      type: string
 *                      description: A short description about the location
 *                      example: The land of a thousand hills
 *                  link:
 *                      type: string
 *                      description: A link to a video or wiki with more info about the location
 *                      example: https://en.wikipedia.org/wiki/Kigali
 *                  locationReturn:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              description: A unique UUID v4 of the user
 *                              example: 952595eb-b193-4391-9196-6840f7ad293d
 *                          LocationName:
 *                              type: string
 *                              description: The name of the location
 *                              example: Kigali
 *                          country:
 *                              type: string
 *                              description: The country where the location is
 *                              example: Rwanda
 *                          description:
 *                              type: string
 *                              description: A short description about the location
 *                              example: The land of a thousand hills
 *                          link:
 *                              type: string
 *                              description: A link to a video or wiki with more info about the location
 *                              example: https://en.wikipedia.org/wiki/Kigali
 */

router.post('/', (0, _accessControl["default"])(['create locations']), _locations.createLocation);
var _default = router;
exports["default"] = _default;