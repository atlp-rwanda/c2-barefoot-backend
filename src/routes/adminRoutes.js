import express from 'express';
import index from '../controllers/admin';
import roles from '../controllers/admin/roles';
import users from '../controllers/admin/users';

import dlt from '../controllers/admin/delete';
import permit from '../controllers/admin/accessControl';

const router = express.Router();

/* a welcome route */


/**
 * @swagger
 *
 * /api/v1/admin:
 *    get:
 *      summary: A route that shows the landing page
 *      description: This is the first page you meet when starting the app.
 *      tags: [Super admin]
 *      responses:
 *        "200":
 *          description: The landing page has loaded
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/landing'
 *
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
 *            example: Welcome as an admin of Barefoot nomad
 */

router.get('/', index);

/* create a role (/admin/roles) */

/**
 * @swagger
 *
 * /api/v1/admin/roles/:
 *    post:
 *      summary: A route that allows the super admin to create roles
 *      tags: [Super admin]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/role'
 *      responses:
 *        "201":
 *          description: Role created successfully
 *        "400":
 *          description: Role exists
 *        "500":
 *          description: Failed to create this role, try again!
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
 */

router.post('/roles', roles.create);

/* update role's permissions */

/**
 * @swagger
 *
 * /api/v1/admin/roles/update:
 *    put:
 *      summary: A route that allows the super admin to update permissions
 *      tags: [Super admin]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/updateRole'
 *      responses:
 *        "201":
 *          description: Permissions updated successfully
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
 */
router.put('/roles/update', roles.updatePermissions);



/* delete a role */ 


/**
 * @swagger
 *
 * /api/v1/admin/roles:
 *    delete:
 *      summary: A route that allows the super admin to delete roles
 *      tags: [Super admin]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/deleteRole'
 *      responses:
 *        "201":
 *          description: Role deleted successfully
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
 *           
 */

router.delete('/roles', roles.deleteRoles);

/* retrieve all users */


/**
 * @swagger
 *
 * /api/v1/admin/users/?page=1&limit=5:
 *    get:
 *      summary: A route that shows all users of Barefoot nomad
 *      description: This is the page that allow the admin to see all users of the system
 *      tags: [Super admin]
 *      responses:
 *        "200":
 *          description: Returns first 5 retrieved users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/adminUsers'
 *        "404":
 *          description: No user found on page 1
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
router.get('/users', users.findThem);

/* update a user role */
router.put('/users', users.updateHim);
/* delete one user */
router.delete('/users', users.deleteOne);

/* a delete route to show how to use this middleware of permissions*
 *for this to pass you have to send exact permission(s) as parameter(s)*/
router.delete('/locations', permit(['delete locations']), dlt);



export default router;
