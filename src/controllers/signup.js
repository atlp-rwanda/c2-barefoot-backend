// Signup page controller
import bcrypt from 'bcrypt';
import models from '../models';
import signUpError from '../utils/signUpError';
import isUserExist from '../services/findUser';
import 'express-async-errors';

const signup = async (req, res, next) => {
  // check if user exists

  const userExist = await isUserExist(req.body.email);
  if (userExist) {
    throw new signUpError('Account already exists', 400);
  }
  // Hash password
  req.body.password = await bcrypt.hash(req.body.password, 10);

  // create the user
  try {
    const createUser = await models.user.create(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default signup;
