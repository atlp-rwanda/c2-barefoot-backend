import models from '../models';

const manager = async (data) => {
  const verifiedUserManager = await models.User.findAndCountAll({
    where: { verified: true, user_role_id: data }, attributes: { exclude: ['password', 'refreshtoken'] }, required: false
  });
  return verifiedUserManager;
};
export default manager;
