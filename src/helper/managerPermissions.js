import { verifyToken } from '../utils/auth';
import findUser from '../services/findUser';
import findRoles from '../services/findRoles';
import permissions from '../config/permissions/index.json';

const managerPermissions = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.status(401).json({ status: 401, message: 'Unauthorized' });
  const token = bearerToken.split(' ')[1];
  const decoded = await verifyToken(token);
  const user = await findUser(decoded.email);
  const roles = await findRoles(decoded.role);
  if (roles.name !== 'manager') return res.status(409).json({ status: 409, message: 'Access denied' });
  // console.log(roles.name);
  if (roles.name === 'manager') {
    // console.log(permissions.manager['edit profile']);
    if (permissions.manager['assign requesters to manager'] !== 1) return res.status(403).json({ status: 403, message: 'You don\'t have this permission' });
    console.log(permissions.manager);
    if (permissions.manager['assign requesters to manager'] === 1) return next();
  }
};

export default managerPermissions;
