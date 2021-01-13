import models from '../models';

const isUserVerified = async (page = 1) => {
  const pageSize = 10;
  const skip = parseInt((page - 1) * pageSize, 10);
  const query = {
    limit: pageSize, offset: skip, where: { verified: true }, attributes: { exclude: ['password', 'refreshtoken'] }, required: false
  };
  query.include = [{ model: models.Role, as: 'user_role', attributes: ['id', 'name'] }, { model: models.User, as: 'line_manager', attributes: ['id', 'first_name', 'last_name'] }];
  const verifiedUser = await models.User.findAndCountAll(query);
  return verifiedUser;
};
export default isUserVerified;
