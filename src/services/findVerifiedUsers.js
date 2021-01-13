import models from '../models';

const isUserVerified = async (limit, skip) => {
  const query = {
    limit, offset: skip, where: { verified: true }, attributes: { exclude: ['password', 'refreshtoken'] }, required: false
  };
  query.include = [{ model: models.Role, as: 'user_role', attributes: ['id', 'name'] }, { model: models.User, as: 'line_manager', attributes: ['id', 'first_name', 'last_name'] }];
  const verifiedUser = await models.User.findAndCountAll(query);
  return verifiedUser;
};
export default isUserVerified;
