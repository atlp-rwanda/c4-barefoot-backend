import express from 'express';
import {
  createAccommodation,
  getAccommodations,
  getOneAccommodation,
  updateAccommodation,
  deleteAccommodation,
  bookAccomodation,
  getAccommodationsBylocationId
} from '../../controllers/accommodations';
import permit from '../../middlewares/accessControl';

const router = express.Router();

/**
 * @swagger
 *
 * /api/v1/accommodations:
 *  get:
 *    summary: A route that allows the Travel Admin to perform CRUD operations on accommodations.
 *    tags: [accommodations]
 *    parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page query is used for pagination
 *    responses:
 *      "200":
 *        description: Returns the first 2 accommodations
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/accommodations'
 *
 *      "404":
 *        description: Error 404 is thrown when no accommodations are available
 *      "403":
 *        description: Unauthorised users are not allowed to view accommodations
 *
 *  components:
 *    schemas:
 *      accommodations:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *            example: 200
 *          page:
 *            type: integer
 *            description: The page of accommodations which you are currently on (Pagination)
 *            example: 1
 *          accommodations:
 *            type: object
 *            description: An object containing accommodations retrieved from the database
 *            properties:
 *              count:
 *                type: integer
 *                description: The number of accommodations available in the database
 *                example: 1
 *              rows:
 *                type: array
 *                description: An array of retrieved accommodations. Each item is a accommodation.
 *                items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: A unique UUID v4 of the user
 *                        example: 952595eb-b193-4391-9196-6840f7ad293d
 *                      country:
 *                        type: string
 *                        description: The country where the accommodation is
 *                        example: Rwanda
 *                      city:
 *                        type: string
 *                        description: The name of the city where the accommodation is
 *                        example: Kigali
 *                      state:
 *                        type: string
 *                        description: The name of the state where the accommodation is located
 *                        example: Nyarugenge
 *                      streetAddress:
 *                        type: string
 *                        description: The street address of the accommodation
 *                        example: KN 22 ST
 *                      locationID:
 *                        type: string
 *                        description: The foreign key of the location from locations table
 *                        example: c6028e0d-ef88-4693-ab49-f37669891724
 *                      propertyType:
 *                        type: string
 *                        description: The type of property
 *                        example: Hostel
 *                      numberOfRooms:
 *                        type: integer
 *                        description: The number of rooms on the property
 *                        example: 100
 *                      typeOfBed:
 *                        type: string
 *                        description: The type of beds available
 *                        example: Double Decker
 *                      title:
 *                        type: string
 *                        description: The name of the accommodation
 *                        example: Kigali Hostels
 *                      description:
 *                        type: string
 *                        description: A short description about the accommodation
 *                        example: A serene environment for relaxation
 *                      photos:
 *                        type: string
 *                        description: links to images of the accommodation
 *                        example: image.png
 *
 *
 */
router.get('/', permit(['view accommodations']), getAccommodations);

/**
 * @swagger
 *
 * /api/v1/accommodations:
 *  get:
 *    summary: A route that allows the User to get accommodations by locations id. 
 *    tags: [accommodations]
 *    parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page query is used for pagination
 *    responses:
 *      "200":
 *        description: Returns the first 2 accommodations
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/accommodations'
 *
 *      "404":
 *        description: Error 404 is thrown when no accommodations are available
 *      "403":
 *        description: Unauthorised users are not allowed to view accommodations
 *
 *  components:
 *    schemas:
 *      accommodations:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *            example: 200
 *          page:
 *            type: integer
 *            description: The page of accommodations which you are currently on (Pagination)
 *            example: 1
 *          accommodations:
 *            type: object
 *            description: An object containing accommodations retrieved from the database
 *            properties:
 *              count:
 *                type: integer
 *                description: The number of accommodations available in the database
 *                example: 1
 *              rows:
 *                type: array
 *                description: An array of retrieved accommodations. Each item is a accommodation.
 *                items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: A unique UUID v4 of the user
 *                        example: 952595eb-b193-4391-9196-6840f7ad293d
 *                      country:
 *                        type: string
 *                        description: The country where the accommodation is
 *                        example: Rwanda
 *                      city:
 *                        type: string
 *                        description: The name of the city where the accommodation is
 *                        example: Kigali
 *                      state:
 *                        type: string
 *                        description: The name of the state where the accommodation is located
 *                        example: Nyarugenge
 *                      streetAddress:
 *                        type: string
 *                        description: The street address of the accommodation
 *                        example: KN 22 ST
 *                      locationID:
 *                        type: string
 *                        description: The foreign key of the location from locations table
 *                        example: c6028e0d-ef88-4693-ab49-f37669891724
 *                      propertyType:
 *                        type: string
 *                        description: The type of property
 *                        example: Hostel
 *                      numberOfRooms:
 *                        type: integer
 *                        description: The number of rooms on the property
 *                        example: 100
 *                      typeOfBed:
 *                        type: string
 *                        description: The type of beds available
 *                        example: Double Decker
 *                      title:
 *                        type: string
 *                        description: The name of the accommodation
 *                        example: Kigali Hostels
 *                      description:
 *                        type: string
 *                        description: A short description about the accommodation
 *                        example: A serene environment for relaxation
 *                      photos:
 *                        type: string
 *                        description: links to images of the accommodation
 *                        example: image.png
 *
 *
 */
router.get('/in/:locationId', permit(['view accommodations']), getAccommodationsBylocationId);

/**
 * @swagger
 *
 * /api/v1/accommodations/{id}:
 *  get:
 *    summary: This route retrieves a specific accommodation with the specified ID
 *    tags: [One Accommodation]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      "200":
 *        description: Returns one accommodation with it's amenities
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/accommodation'
 *
 *      "404":
 *        description: Error 404 is thrown when the accommodation does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view accommodations
 *
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      accommodation:
 *        type: object
 *        properties:
 *          singleAccomodation:
 *            type: object
 *            properties:
 *                id:
 *                    type: string
 *                    description: A unique UUID v4 of the user
 *                    example: 952595eb-b193-4391-9196-6840f7ad293d
 *                country:
 *                     type: string
 *                     description: The country where the accommodation is
 *                     example: Rwanda
 *                city:
 *                     type: string
 *                     description: The name of the city where the accommodation is
 *                     example: Kigali
 *                state:
 *                     type: string
 *                     description: The name of the state where the accommodation is located
 *                     example: Nyarugenge
 *                streetAddress:
 *                     type: string
 *                     description: The street address of the accommodation
 *                     example: KN 22 ST
 *                locationID:
 *                     type: string
 *                     description: The foreign key of the location from locations table
 *                     example: c6028e0d-ef88-4693-ab49-f37669891724
 *                propertyType:
 *                     type: string
 *                     description: The type of property
 *                     example: Hostel
 *                numberOfRooms:
 *                     type: integer
 *                     description: The number of rooms on the property
 *                     example: 100
 *                typeOfBed:
 *                     type: string
 *                     description: The type of beds available
 *                     example: Double Decker
 *                title:
 *                     type: string
 *                     description: The name of the accommodation
 *                     example: Kigali Hostels
 *                description:
 *                     type: string
 *                     description: A short description about the accommodation
 *                     example: A serene environment for relaxation
 *                photos:
 *                     type: string
 *                     description: links to images of the accommodation
 *                     example: image.png
 *          amenities:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The unique id ofr the amenity
 *                      example: dda5e181-6390-48e5-a5ee-238fb40359a4
 *                  AccommodationId:
 *                      type: string
 *                      description: Foreign key of corresponding accommodation
 *                      example: 952595eb-b193-4391-9196-6840f7ad293d
 *                  wifi:
 *                      type: boolean
 *                      description: Availability of wifi
 *                      example: true
 *                  airConditioner:
 *                      type: boolean
 *                      description: Availability of air conditioning
 *                      example: false
 *                  shampoo:
 *                      type: boolean
 *                      description: Availability of shampoo
 *                      example: true
 *                  ironing:
 *                      type: boolean
 *                      description: Availability of ironing
 *                      example: false
 *                  tv:
 *                      type: boolean
 *                      description: Availability of tv
 *                      example: true
 *                  smokeDetector:
 *                      type: boolean
 *                      description: Availability of wifi
 *                      example: false
 *                  fireExtinguisher:
 *                      type: boolean
 *                      description: Availability of wifi
 *                      example: false
 *                  lockOnDoor:
 *                      type: boolean
 *                      description: Availability of wifi
 *                      example: false
 */
router.get('/:id', permit(['view accommodations']), getOneAccommodation);

/**
 * @swagger
 *
 * /api/v1/accommodations/{id}:
 *  patch:
 *    summary: This route updates a specific accommodation with the specified ID
 *    tags: [Update one accommodation]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      "201":
 *        description: The accommodation is updated successfully
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/accommodation'
 *
 *      "404":
 *        description: Error 404 is thrown when the accommodation does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view accommodations
 *
 *  components:
 *      schemas:
 *          accommodation:
 *              type: object
 *              properties:
 *                  status:
 *                      type: integer
 *                      description: The HTTP status code
 *                      example: 201
 *                  message:
 *                      type: integer
 *                      description: A message indicating the operation was successfull
 *                      example: Accommodation successfully updated
 */
router.patch('/:id', permit(['update accommodations']), updateAccommodation);

/**
 * @swagger
 *
 * /api/v1/accommodations/{id}:
 *  delete:
 *    summary: This route deletes a specific accommodation with the specified ID
 *    tags: [Delete one accommodation]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      "201":
 *        description: The accommodation is deleted successfully
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/accommodation'
 *
 *      "404":
 *        description: Error 404 is thrown when the accommodation does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view accommodations
 *
 *  components:
 *      schemas:
 *          accommodation:
 *              type: object
 *              properties:
 *                  status:
 *                      type: integer
 *                      description: The HTTP status code
 *                      example: 201
 *                  message:
 *                      type: integer
 *                      description: A message indicating the operation was successfull
 *                      example: Location has been deleted
 */
router.delete('/:id', permit(['delete accommodations']), deleteAccommodation);

/**
 * @swagger
 *
 * /api/v1/accommodations:
 *  post:
 *    summary: This route creates accommodations
 *    tags: [Create Accommodation]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/accommodation'
 *    responses:
 *      "201":
 *        description: The accomodation is successfully created
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/accommodation'
 *
 *      "404":
 *        description: Error 404 is thrown when the accommodation does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view accommodations
 *
 *  components:
 *    schemas:
 *      accommodation:
 *        type: object
 *        properties:
 *                country:
 *                     type: string
 *                     description: The country where the accommodation is
 *                     example: Rwanda
 *                city:
 *                     type: string
 *                     description: The name of the city where the accommodation is
 *                     example: Kigali
 *                state:
 *                     type: string
 *                     description: The name of the state where the accommodation is located
 *                     example: Nyarugenge
 *                streetAddress:
 *                     type: string
 *                     description: The street address of the accommodation
 *                     example: KN 22 ST
 *                locationID:
 *                     type: string
 *                     description: The foreign key of the location from locations table
 *                     example: c6028e0d-ef88-4693-ab49-f37669891724
 *                propertyType:
 *                     type: string
 *                     description: The type of property
 *                     example: Hostel
 *                numberOfRooms:
 *                     type: integer
 *                     description: The number of rooms on the property
 *                     example: 100
 *                typeOfBed:
 *                     type: string
 *                     description: The type of beds available
 *                     example: Double Decker
 *                title:
 *                     type: string
 *                     description: The name of the accommodation
 *                     example: Kigali Hostels
 *                description:
 *                     type: string
 *                     description: A short description about the accommodation
 *                     example: A serene environment for relaxation
 *                photos:
 *                     type: string
 *                     description: links to images of the accommodation
 *                     example: image.png
 */
router.post('/', permit(['create accommodations']), createAccommodation);

/**
 * @swagger
 *
 * /api/v1/accommodations/book/{id}:
 *  post:
 *    summary: This route allows managers and requesters to book accommodations
 *    tags: [Book Accommodation]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/booking'
 *    responses:
 *      "201":
 *        description: The accomodation is successfully booked
 *      "400":
 *        description: The accommodation is full
 *      "404":
 *        description: Error 404 is thrown when the accommodation does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view accommodations
 *
 *  components:
 *    schemas:
 *      booking:
 *        type: object
 *        properties:
 *                From:
 *                     type: string
 *                     description: From which date you intend to book an accommodation
 *                     example: 2020-10-10
 *                To:
 *                     type: string
 *                     description: Last Day of your stay at the accommodation
 *                     example: 2020-10-12
 */
router.post('/book/:id', permit(['book accommodations']), bookAccomodation);
export default router;
