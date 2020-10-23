// Signup page controller
import bcrypt from 'bcrypt';
import models from '../models';

const signup = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);

  try {
    const createUser = await models.user.create(req.body);
    next();
  } catch (error) {
    res.status(400).json({ Error: error.errors[0].message });
  }
};

export default signup;
