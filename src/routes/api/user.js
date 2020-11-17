import express from 'express';
import signup from '../../controllers/userController/signup';
import signupValidation from '../../middlewares/signupValidation';
import sendVerificationEmail from '../../middlewares/sendEmail';
import verification from '../../controllers/userController/verification';
import loginValidation from '../../middlewares/loginValidation';
import logedIn from '../../helper/isLogedIn';
import login from '../../controllers/userController/login';
import logout from '../../controllers/userController/logout';
import refreshToken from '../../controllers/userController/refreshToken';
import getAllUsers from '../../controllers/userController/users';
import verifyUserToken from '../../middlewares/usertokenverification';

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
 * /api/v1/user/verification/:
 *    patch:
 *      summary: The email verification endpoint
 *      description: This endpoint is used when one is verifying their email.
 *      tags: [Email verification]
 *      parameters:
 *        - in: query
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *          description: The token is used to verify the user
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

router.patch('/verification/', verification);
/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Route allow users to login with email and password
 *     parameters:
 *       - in: body
 *         name: login
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: success data
 *         schema:
 *           landing:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               description: The http status code
 *               example: 200
 *             message:
 *               type: string
 *               description: Success message
 *               example: Login successful
 *             userToken:
 *               type: string
 *               description: token used to access for protected routes
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImZpcnN0X25hbWUiOiJBbWl
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
router.post('/login', loginValidation, login);

/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     tags:
 *       - Logout user
 *     summary: Route allow users to regenerete access token
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: success data
 *         schema:
 *           refresh-token:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               description: The http status code
 *               example: 200
 *             message:
 *               type: string
 *               description: success message
 *               example: logout successful
 */
router.post('/logout', logedIn, logout);
/**
 * @swagger
 * /api/v1/user/refresh-token:
 *   post:
 *     tags:
 *       - Refresh token
 *     summary: Route allow users to regenerete access token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success data
 *         schema:
 *           refresh-token:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               description: The http status code
 *               example: 200
 *             userToken:
 *               type: string
 *               description: token used to access for protected routes
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImZpcnN0X25hbWUiOiJBbWl
 */
router.post('/refresh-token', refreshToken);
/**
 * @swagger
 *
 * /api/v1/user/all-users:
 *    get:
 *      summary: get all users
 *      description: This endpoint is used to get all users.
 *      tags: [get all users]
 *      parameters:
 *        - in: query
 *          name: page
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: successful got all users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/success'
 *        "400":
 *          description: no user found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/noUser'
 *        "404":
 *          description: number of pages provided are greater than pages available
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/invalidPage'
 *        "500":
 *          description: OFFSET must not be negative
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/offsetPage'
 *
 * components:
 *    schemas:
 *      success:
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
 *      noUser:
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
 *          Error: no user found
 *      invalidPage:
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
 *          Error: number of pages provided are greater than pages available
 *      offsetPage:
 *        type: object
 *        properties:
 *          Status:
 *            type: integer
 *            description: The HTTP status code
 *          Error:
 *            type: string
 *            description: The error message
 *        example:
 *          Status: 500
 *          Error: page should be both positive and non zero
 */
router.get('/all-users', verifyUserToken, getAllUsers);
export default router;
