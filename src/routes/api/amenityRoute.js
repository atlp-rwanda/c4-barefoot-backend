import express from 'express';
import updateAmenity from '../../controllers/amenity';
import permit from '../../middlewares/accessControl';

const router = express.Router();

/**
 * @swagger
 *
 * /api/v1/amenities/{id}:
 *  patch:
 *    summary: This route updates a specific amenity with the specified ID
 *    tags: [Update one amenity]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      "201":
 *        description: The amenity is updated successfully
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/amenity'
 *
 *      "404":
 *        description: Error 404 is thrown when the amenity does not exist
 *      "403":
 *        description: Unauthorised users are not allowed to view amenities
 *
 *  components:
 *      schemas:
 *          amenity:
 *              type: object
 *              properties:
 *                  status:
 *                      type: integer
 *                      description: The HTTP status code
 *                      example: 201
 *                  message:
 *                      type: integer
 *                      description: A message indicating the operation was successfull
 *                      example: Amenity successfully updated
 */

router.patch('/:accommodationId', permit(['update accommodations']), updateAmenity);

export default router;
