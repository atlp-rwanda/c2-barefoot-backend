import UserServices from '../../services/user.service';
import NotFoundRequestError from '../../utils/Errors/notFoundRequestError';
import ApplicationError from '../../utils/Errors/applicationError';
import BadRequestError from '../../utils/Errors/badRequestError';
import AuthorizationError from '../../utils/Errors/authorizationError';
import { comparePassword, hashPassword } from '../../utils/auth';

// get a user profile with either Id or first_name
const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) throw new BadRequestError('invalid URI', 400);
    const record = await UserServices.getUserByUserName(username);
    if (!record) throw new NotFoundRequestError('user not found', 404);
    res.status(200).json({ status: 200, message: 'successful got user profile', data: record });
  } catch (err) { next(err); }
};

const updateUserProfile = async (req, res, next) => {
  try {
    if (!res.locals.token) throw new ApplicationError('unable to obtain a payload in token', 500);
    const username = res.locals.token;
    const record = await UserServices.getUserByUserName(username);
    if (!record) throw new NotFoundRequestError('user not found', 404);
    if (record.dataValues.username !== username) throw new AuthorizationError('owner of profile does not match signed in user', 401);
    UserServices.updateUserByUsername(req.body, username);
    res.status(200).json({ status: 200, message: 'successfully updated your profile' });
  } catch (err) { next(err); }
};

const changePassword = async (req, res, next) => {
  try {
    if (!res.locals.token) throw new ApplicationError('unable to obtain a payload in token', 500);
    const username = res.locals.token;
    const record = await UserServices.getPasswordByUserName(username);
    if (!record) throw new NotFoundRequestError('user not found', 404);
    if (record.dataValues.username !== username) throw new AuthorizationError('owner of profile does not match signed in user', 401);
    const { currentPassword, newPassword } = req.body;
    const checkPass = comparePassword(currentPassword, record.dataValues.password)
    if (!checkPass) throw new NotFoundRequestError('user with that password is not found', 404);
    UserServices.updateUserByUsername(newPassword, username);
    res.status(200).json({ status: 200, message: 'successfully updated your profile' });
  } catch (err) {
    next(err);
  }
};

export { getUserProfile, updateUserProfile, changePassword };
