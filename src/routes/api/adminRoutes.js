import express from 'express';
import {
  roleValidation, updateValidation, updateUserRoleValidation, deleteValidation, deleteValidationEmail, assignLineManagerValidation
} from '../../middlewares/validation/createRole';
import {
  findUsers, updateUserRole, deleteOne, createRole, getAllRoles, updatePermissions, deleteRoles, assignLineManager
} from '../../controllers/admin/users_roles';
import { changeUserRole } from '../../middlewares/changeUserRole';
import permit from '../../middlewares/accessControl';

const router = express.Router();

/* retrieve all roles created */

/**
 * @swagger
 *
 * /api/v1/admin/roles:
 *    get:
 *      summary: A route that shows all roles available in Barefoot nomad
 *      description: This is the page that allow the administrator to see all roles of the system
 *      tags: [Super administrator]
 *      responses:
 *        "200":
 *          description: Returns first 5 retrieved users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/allRoles'
 *        "404":
 *          description: No role found
 *        "500":
 *          description: Failed to fetch roles try again!
 *
 * components:
 *    schemas:
 *      allRoles:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          roles:
 *            type: object
 *            description: retrieved users
 *            properties:
 *              count:
 *                type: integer
 *                example: 1
 *              rows:
 *                type: object
 *                properties:
 *                  id:
 *                   type: integer
 *                   example: 1
 *                  name:
 *                    type: string
 *                    example: string
 *                  description:
 *                    type: string
 *                    example: string
 *
 */

router.get('/roles', getAllRoles);

/* create a new role  */

/**
 * @swagger
 *
 * /api/v1/admin/roles:
 *    post:
 *      summary: A route that allows the super administrator to create roles
 *      tags: [Super administrator]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/role'
 *      responses:
 *        "201":
 *          description: Role created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/roleCreated'
 *        "400":
 *          description: Role exists
 *        "500":
 *          description: Failed to create this role, try again
 *
 * components:
 *    schemas:
 *      role:
 *        type: object
 *        required:
 *          - role
 *          - description
 *        properties:
 *           role:
 *             type: string
 *           description:
 *             type: string
 *      roleCreated:
 *        type: object
 *        properties:
 *           status:
 *             type: integer
 *             example: 201
 *           message:
 *             type: string
 *             example: Role created successfully
 */

router.post('/roles', roleValidation, createRole);

/* update role's permissions */

/**
 * @swagger
 *
 * /api/v1/admin/roles/update:
 *    put:
 *      summary: A route that allows the super administrator to update permissions
 *      tags: [Super administrator]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/updateRole'
 *      responses:
 *        "201":
 *          description: Permissions updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/roleUpdated'
 *        "400":
 *          description: These permissions or values are not allowed
 *        "404":
 *          description: Role not exist!
 *
 * components:
 *    schemas:
 *      updateRole:
 *        type: object
 *        required:
 *          - role
 *          - permissions
 *        properties:
 *           role:
 *             type: string
 *           permissions:
 *             type: object
 *             properties:
 *                edit profile:
 *                  type: integer
 *      roleUpdated:
 *        type: object
 *        properties:
 *           status:
 *             type: integer
 *             example: 201
 *           message:
 *             type: string
 *             example: Permissions updated successfully
 *           failed permissions:
 *             type: array
 *             example: []
 *           success:
 *             type: object
 *             properties:
 *               edit profile:
 *                 type: integer
 *                 example: 1
 */
router.put('/roles/update', updateValidation, updatePermissions);

/* delete a role */

/**
 * @swagger
 *
 * /api/v1/admin/roles:
 *    delete:
 *      summary: A route that allows the super administrator to delete roles
 *      tags: [Super administrator]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/deleteRole'
 *      responses:
 *        "200":
 *          description: Role deteted successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/deletedRole'
 *        "400":
 *          description: \"role\" is required
 *        "404":
 *          description: Role not exist!
 *        "500":
 *          description: Failed to delete this role, try again!
 *
 * components:
 *    schemas:
 *      deleteRole:
 *        type: object
 *        required:
 *          - role
 *        properties:
 *           role:
 *             type: string
 *      deletedRole:
 *        type: object
 *        properties:
 *           status:
 *             type: integer
 *             example: 200
 *           message:
 *             type: string
 *             example: Role deleted successfully
 *           role:
 *             type: string
 *             example: role name
 */

router.delete('/roles', deleteValidation, deleteRoles);

/* retrieve all users */

/**
 * @swagger
 *
 * /api/v1/admin/users/?page=1&limit=5:
 *    get:
 *      summary: A route that shows all users of Barefoot nomad
 *      description: This is the page that allow the administrator to see all users of the system
 *      tags: [Super administrator]
 *      responses:
 *        "200":
 *          description: Returns first 5 retrieved users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/adminUsers'
 *        "404":
 *          description: No user found on page 1
 *        "500":
 *          description: Failed to fetch users, try again!
 *
 * components:
 *    schemas:
 *      adminUsers:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          users:
 *            type: object
 *            description: retrived users
 *            properties:
 *              count:
 *                type: integer
 *                example: 1
 *              rows:
 *                type: object
 *                properties:
 *                  id:
 *                   type: integer
 *                   example: 1
 *                  first_name:
 *                    type: string
 *                    example: first string
 *                  last_name:
 *                    type: string
 *                    example: last string
 *                  email:
 *                    type: string
 *                    example: string@string.com
 *                  user_role:
 *                    type: string
 *                    example: string
 *                  address:
 *                    type: string
 *                    example: string
 *                  language:
 *                    type: string
 *                    example: string
 *                  profile_picture:
 *                    type: string
 *                    example: string
 *                  manager_id:
 *                    type: string
 *                    example: string
 *
 */
router.get('/users', findUsers);

/* update a user role */

/**
 * @swagger
 *
 * /api/v1/admin/users:
 *    put:
 *      summary: A route that allows the super administrator to update one's role
 *      description: This is the page that allows the administrator to update/change all user roles or assign the new roles
 *      tags: [Super administrator]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/updateUser'
 *      responses:
 *        "201":
 *          description: The user is updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/updatedUser'
 *        "400":
 *          description: \"role\" and \"email\" are required
 *        "403":
 *          description: Forbidden
 *        "404":
 *          description: The user is not found or \"Role\" not exist
 *
 * components:
 *    schemas:
 *      updateUser:
 *        type: object
 *        required:
 *          - role
 *          - email
 *        properties:
 *          role:
 *            type: string
 *            example: string
 *          email:
 *            type: string
 *            example: string@gmail.com
 *      updatedUser:
 *        type: object
 *        properties:
 *           status:
 *             type: integer
 *             example: 201
 *           message:
 *             type: string
 *             example: The user updated to \"Role\"
 *
 */
router.put('/users', updateUserRoleValidation, updateUserRole);
// when you change a requester as a manager, then add him also to the line_manager table and also change so that we will update the primary key not the name of the role

/**
 * @swagger
 *
 * /api/v1/admin/users/line-manager:
 *    put:
 *      summary: A route that allows the super administrator to change or give a user his line-manager
 *      tags: [Super administrator]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/addLineManager'
 *      responses:
 *        "201":
 *          description: Line manager is assigned successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/addedLineManager'
 *        "400":
 *          description: \"manager_id\" and \"email\" are required
 *        "403":
 *          description: Can not assign line manager to administrator!
 *        "404":
 *          description: The user or line-manager not found
 *        "500":
 *          description: Failed to assign this line manager, try again!
 *
 * components:
 *    schemas:
 *      addLineManager:
 *        type: object
 *        required:
 *          - manager_id
 *          - email
 *        properties:
 *          manager_id:
 *            type: integer
 *            example: 1
 *          email:
 *            type: string
 *            example: string@gmail.com
 *      addedLineManager:
 *        type: object
 *        properties:
 *           status:
 *             type: integer
 *             example: 201
 *           message:
 *             type: string
 *             example: Line manager is assigned successfully
 *
 */
router.put('/users/line-manager', permit(['assign requesters to manager']), assignLineManagerValidation, assignLineManager);

/* delete one user */

/**
 * @swagger
 *
 * /api/v1/admin/users:
 *    delete:
 *      summary: A route that allows the super administrator to delete one's account
 *      description: This is the page that allows the administrator to delete user accounts
 *      tags: [Super administrator]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/deleteUser'
 *      responses:
 *        "200":
 *          description: The user is deleted successfully!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/deletedUser'
 *        "400":
 *          description: \"email\" is required
 *        "403":
 *          description: Can not delete the administrator!
 *        "404":
 *          description: The user does not exist!
 *        "500":
 *          description: Failed to delete this user! Try again
 *
 * components:
 *    schemas:
 *      deleteUser:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *          email:
 *            type: string
 *            example: string@gmail.com
 *      deletedUser:
 *        type: object
 *        properties:
 *           status:
 *             type: integer
 *             example: 200
 *           message:
 *             type: string
 *             example: The user is deleted successfully!
 *
 */

router.delete('/users', deleteValidationEmail, changeUserRole, deleteOne);

/* a delete route to show how to use this middleware of permissions*
 *for this to pass you have to send exact permission(s) as parameter(s) */
// router.delete('/locations', permit(["all"]), dlt);

export default router;
