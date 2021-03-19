
import {weatherData} from '../../controllers/weatherApi';
import express from 'express';
const router = express.Router();

/**
 * @swagger
 *
 * /api/v1:
 *    get:
 *      summary: A route that shows the landing page
 *      description: This is the first page you meet when starting the app.
 *      tags: [Landing Page]
 *      responses:
 *        "200":
 *          description: The landing page has loaded
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/landing'
 * components:
 *    schemas:
 *      landing:
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

router.get('/weather', function(req, res){

const message = { 
  content: {"en": "English Message"},
  included_segments: ["All"]
};
weatherData(req, res, message);
});
export default router;
