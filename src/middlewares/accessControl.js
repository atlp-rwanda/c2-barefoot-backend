import accessDenied from '../utils/errorHandling/accessDenied';
import notFound from '../utils/errorHandling/notFound';
import roleServices from '../services/roles';
// import jwt from 'jsonwebtoken';
import ApplicationError from '../utils/applicationError';
import { verifyToken } from '../utils/auth';

/* import index.json file */
const roles = roleServices.readFile();
let rolesData = {};
rolesData = JSON.parse(roles);

export default function permit(permission) {
  return async (req, res, next) => {
    try {
      const userToken = req.header('authorization');
      if (!userToken) {
        throw new accessDenied('You are not authorized', 403);
      }
      const tokenVerify = await verifyToken(userToken); // jwt.verify(userToken, process.env.TOKEN_SECRET);
      const findRoleById = await roleServices.findRoleById({ id: tokenVerify.user_role_id });
      if (findRoleById) {
        const role = findRoleById.name;

        /* check if this role exist */
        if (!rolesData.hasOwnProperty(role)) {
          throw new notFound('Role does not exist');
        }
        let allowed = !!permission.length;
        if (permission[0] === 'all') {
          permission = [
            'edit profile', 'assign requesters to manager',
            'create travel requests', 'view travel requests',
            'edit travel requests', 'cancel travel requests',
            'approve direct reports travel requests',
            'view direct reports travel requests',
            'reject direct reports travel requests', 'view accommodations',
            'create accommodations', 'update accommodations',
            'delete accommodations', 'book accommodations', 'view locations',
            'create locations', 'update locations', 'delete locations'
          ];
        }
        /* loop through permissions sent */

        for (let i = 0; i < permission.length; i++) {
          /* check if this task does not exist */
          if (!rolesData[role].hasOwnProperty(permission[i])) {
            throw new notFound(`Permission does not exist! ["${permission[i]}"]`);
          }

          /* check if rolesData[role][permission[i]] is 1 or 0
            then assign "allowed", true or false
            if false "break" the loop otherwise go to the next permission */
          if (!(allowed = !!rolesData[role][permission[i]])) break;
        }

        if (allowed) {
          next();
        } else {
          throw new accessDenied(`You don't have permissions to [${permission}]`);
        }
      } else {
        throw new ApplicationError('Failed to retrieve the user role, Try again later!');
      }
    } catch (error) {
      next(error);
    }
  };
}