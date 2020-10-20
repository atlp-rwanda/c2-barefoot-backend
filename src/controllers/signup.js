// Signup page controller
import bcrypt from 'bcrypt';
import models from '../models';
import sendVerificationEmail from './sendEmail';

const signup = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);

  try {
    const createUser = await models.user.create(req.body);
    const { error } = await sendVerificationEmail(req.body.email);
    if (error) return res.status(400).json(error);
    return res.status(201).json({ message: 'User has been created' });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default signup;
