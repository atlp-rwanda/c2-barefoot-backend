// Signup page controller
import bcrypt from 'bcrypt';
import models from '../models';

const signup = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);

  try {
    const createUser = await models.user.create(req.body);
    return res.status(201).json({ message: 'User has been created', user: createUser });
  } catch (error) {
    res.status(400).json(error.errors[0].message);
  }
};

export default signup;
