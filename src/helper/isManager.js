import { verifyToken } from '../utils/auth';
import findRoles from '../services/findRoles';

const isManager = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.status(401).json({ status: 401, message: 'Unauthorized' });
  const token = bearerToken.split(' ')[1];
  const decoded = await verifyToken(token);
  // const user = await findUser(decoded.email);
  const roles = await findRoles(decoded.role);
  if (roles.name !== 'manager') return res.status(409).json({ status: 409, message: 'Access denied' });
  if (roles.name === 'manager') return next();
};
// user.user_role_id

export default isManager;
