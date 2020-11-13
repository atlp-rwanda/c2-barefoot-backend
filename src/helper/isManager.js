import { verifyToken } from '../utils/auth';
import findUser from '../services/findUser';
import findRoles from '../services/findRoles';
import premissions from '../config/permissions/index.json';

const isManager = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(' ')[1];
  const decoded = await verifyToken(token);
  // const user = await findUser(decoded.email);
  const roles = await findRoles(decoded.role);
  if (roles.name !== 'manager') return res.status(409).json({ status: 409, message: 'Access denied' });
  if (roles.name === 'manager') return next();
};
// user.user_role_id

export default isManager;
