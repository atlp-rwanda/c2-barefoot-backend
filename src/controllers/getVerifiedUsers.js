import findVerifiedUser from '../services/findVerifiedUsers';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';

const verifiedUser = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  const skip = ((page - 1) === -1) ? 0 : (page - 1) * limit;

  const verifiedUsers = await findVerifiedUser(limit, skip);
  if (!verifiedUsers) throw new NotFoundRequestError('No verified users found', 404);
  return res.status(200).json({
    status: 200, message: 'verified users', page, verifiedUsers
  });
};
export default verifiedUser;
