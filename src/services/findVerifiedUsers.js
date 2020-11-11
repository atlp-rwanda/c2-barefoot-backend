import models from '../models';

const isUserVerified = async () => {
  const verifiedUser = await models.User.findAll({ where: { verified: true }, attributes: { exclude: ["password", "refreshtoken"] }, required: false });
  return verifiedUser;
};
export default isUserVerified;
