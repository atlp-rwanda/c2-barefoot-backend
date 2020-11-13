import models from '../models';

const manager = async (data, page = 1) => {
  const page_size = 12;
  const skip = (page - 1) * page_size;
  const verifiedUserManager = await models.User.findAndCountAll({
    offset: skip, limit: page_size, where: { verified: true, user_role_id: data }, attributes: { exclude: ['password', 'refreshtoken'] }, required: false
  });
  return verifiedUserManager;
};
export default manager;
