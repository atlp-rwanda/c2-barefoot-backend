import findUser from '../services/findUserById';

const assignUsersToManager = async (req, res) => {
  const userId = req.params.id;
  const { user_role_id } = req.body;
  try {
    const user = await findUser(userId);
    if (!user) return res.status(404).json({ status: 404, message: `User with this ${userId} is not exist` });
    user.update({ user_role_id }).then((results) => {
      res.json({ message: 'user was assigned', results });
    });
  } catch (error) {
    res.json(error.message);
  }
};
export default assignUsersToManager;
