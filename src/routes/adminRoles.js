import express from 'express';
import index from '../controllers/admin';
import roles from '../controllers/admin/roles';
import users from '../controllers/admin/users';

import dlt from '../controllers/admin/delete';
import permissions from '../controllers/admin/accessControl';

const router = express.Router();

/* a welcome route */
router.get('/', index);

/* create a role (/admin/roles) */
router.post('/roles', roles.create);

/* update role's permissions */
router.post('/roles/update', roles.updatePermissions);

/* delete a role */
router.delete('/roles', roles.deleteRoles);

/* retrieve all users */
router.get('/users', users.findThem);

/* 
router.delete('/users', users.deleteOne);

/* a delete route to show how to use this middleware of permissions*
 *for this pass to pass you have to send role and exact permission
 in your json body request */
router.delete('/user', permissions, dlt);



export default router;
