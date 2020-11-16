import findUser from '../services/findUserById';
import models from '../models';
import NotFoundRequestError from '../utils/notFoundRequestError';

const assignUsersToManager = async (req, res) => {
  const userId = req.params.id;
  const { managerId } = req.body;
  try {
    const user = await findUser(userId);
    if (!user) {
      throw new NotFoundRequestError(`User with this ${userId} is not exist`, 404);
    }
    models.User.update({ managerId }, { where: { email: user.email } });
    return res.status(200).json({ status: 200, message: `user was assigned to manager with this Id ${managerId}` });
  } catch (error) {
    res.json(error.message);
  }
};
export default assignUsersToManager;
