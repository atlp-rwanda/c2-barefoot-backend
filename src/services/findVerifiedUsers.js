import models from '../models';

const isUserVerified = async (page = 1) => {
  const page_size = 2;
  const skip = (page - 1) * page_size;
  const verifiedUser = await models.User.findAndCountAll({
    limit: page_size, offset: skip, where: { verified: true }, attributes: { exclude: ['password', 'refreshtoken'] }, required: false
  });
  return verifiedUser;
};
export default isUserVerified;
