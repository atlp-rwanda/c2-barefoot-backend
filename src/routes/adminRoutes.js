import express from 'express';
import index from '../controllers/admin';
import roles from '../controllers/admin/roles';
import users from '../controllers/admin/users';

import dlt from '../controllers/admin/delete';
import permit from '../controllers/admin/accessControl';

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

router.put('/users', users.updateHim);
/* delete one user */
router.delete('/users', users.deleteOne);

/* a delete route to show how to use this middleware of permissions*
 *for this to pass you have to send exact permission(s) as parameter(s)*/
router.delete('/locations', permit(['delete locations']), dlt);



export default router;
