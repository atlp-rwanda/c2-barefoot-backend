import BadRequestError from '../../utils/Errors/badRequestError';
import NotFound from '../../utils/Errors/notFoundRequestError';
import readData from '../../utils/readData';
import 'express-async-errors';

const getPermissions = (req, res, next) => {
  try {
    if (!req.query.role) {
      throw new BadRequestError('Role not found');
    }
    const { role } = req.query;
    const permissions = readData.getPermissionsObject();

    if (!permissions.hasOwnProperty(role)) {
      throw new NotFound('Role does not exist');
    }
    res.status(200).json(permissions[role]);
  } catch (error) {
    next(error);
  }
};

export default getPermissions;
