import express from 'express';
import index from '../controllers/admin';
import roles from '../controllers/admin/roles';
import dlt from '../controllers/admin/delete';
import permissions from '../controllers/admin/accessControl';

const router = express.Router();

/* welcome endpoint */
router.get('/', index);

/* create a role endpoint (/admin/roles) */
router.post('/roles', roles.create);

/* create a role endpoint for updating permissions*/
router.post('/roles/update', roles.updatePermissions);

/* create a role endpoint for deleting roles*/
router.delete('/roles', roles.deleteRoles);

/* a delete endpoint to show how to use this middleware of permissions*
 *for this pass to pass you have to send role and exact permission
 in your json body request */
router.delete('/user', permissions, dlt);

export default router;
