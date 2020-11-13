import models from '../models';

const roles = async () => {
  const role = await models.Role.findAll();
  return role;
};
export default roles;
