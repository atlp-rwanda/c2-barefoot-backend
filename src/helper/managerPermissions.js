import { verifyToken } from '../utils/auth';
import findUser from '../services/findUser';
import findRoles from '../services/findRoles';
import permissions from '../config/permissions/index.json';

const managerPermissions = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(' ')[1];
  const decoded = await verifyToken(token);
  const user = await findUser(decoded.email);
  const roles = await findRoles(user.user_role_id);
  if (roles.name !== 'requester') return res.status(409).json({ status: 409, message: 'Access denied' });
  if (roles.name === 'requester') {
    if (permissions.requester['edit profile'] === 0);
    console.log('permited to edit profile');
    return next();
  }
};

export default managerPermissions;
