import express from 'express';
import signup from '../../controllers/signup';
import signupValidation from '../../middlewares/signupValidation';
import sendVerificationEmail from '../../middlewares/sendEmail';
import verification from '../../controllers/verification';
import getAllUsers from '../../controllers/users';
import verifyUserToken from '../../middlewares/usertokenverifcation';

const router = express.Router();

// --------------------Signup Route ---------------

/**
 * @swagger
 *
 * /api/v1/user/signup/:
 *    post:
 *      summary: A route that allows a user to sign up
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      responses:
 *        "201":
 *          description: User has been created. Check email for verification
 *        "400":
 *          description: Account already exists
 *        "401":
 *          description: Verification Email not sent, try again
 *
 * components:
 *    schemas:
 *      user:
 *        type: object
 *        required:
 *          - first_name
 *          - last_name
 *          - email
 *          - password
 *          - address
 *          - language
 *          - profile_picture
 *        properties:
 *           first_name:
 *             type: string
 *           last_name:
 *             type: string
 *           username:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           address:
 *             type: string
 *           language:
 *             type: string
 *           occupation:
 *             type: string
 *           profile_picture:
 *             type: string
 *
 */

router.post('/signup', signupValidation, signup, sendVerificationEmail);

/**
 * @swagger
 *
 * /api/v1/user/verification/{token}:
 *    patch:
 *      summary: The email verification endpoint
 *      description: This endpoint is used when one is verifying their email.
 *      tags: [Email verification]
 *      parameters:
 *        - in: path
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Email is verified successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/verified'
 *        "400":
 *          description: The account is already verified
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/alreadyVerified'
 *        "404":
 *          description: The account does not exist
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/notFound'
 *
 * components:
 *    schemas:
 *      verified:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *          Message:
 *            type: string
 *            description: Success message
 *        example:
 *          status: 200
 *          Message: Email has been verified
 *      alreadyVerified:
 *        type: object
 *        properties:
 *          Status:
 *            type: integer
 *            description: The HTTP status code
 *          Error:
 *            type: string
 *            description: The error message
 *        example:
 *          Status: 400
 *          Error: Account already verified
 *      notFound:
 *        type: object
 *        properties:
 *          Status:
 *            type: integer
 *            description: The HTTP status code
 *          Error:
 *            type: string
 *            description: The error message
 *        example:
 *          Status: 404
 *          Error: Account does not exist
 */

router.patch('/verification/:token', verification);
/**
 * @swagger
 *
 * /api/v1/user/all-users?{page}:
 *    get:
 *      summary: getting all users endpoint
 *      description: This endpoint is used to retrieve all users in database.
 *      tags: [get all users]
 *      parameters:
 *        - in: query
 *          name: page
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: users are retrivied successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/all-users'
 *        "400":
 *          description: no users are found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/notFound'
 *        "500":
 *          description: failed to retrieve users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/failedToRetrieve'
 *
 * components:
 *    schemas:
 *      all-users:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *          Message:
 *            type: string
 *            description: Success message
 *        example:
 *          status: 200
 *          Message: successful got all users
 *      notFound:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *          error:
 *            type: string
 *            description: The error message
 *        example:
 *          status: 400
 *          error: no users found
 *      failedToRetrieve:
 *        type: object
 *        properties:
 *          status:
 *             type: intiger
 *             description: the HTTp status code
 *          error:
 *             type: string
 *             description: the Error message
 *        example:
 *           status: 500
 *           error: failed to retrieve users
 */
// ----------------- get all users ------------
router.get('/all-users', verifyUserToken, getAllUsers);

export default router;
