// Signup page controller
import bcrypt from 'bcrypt';
import models from '../models';
import signUpError from '../errors/signUpError';
import isUserExist from '../services/findUser';

const signup = async (req, res, next) => {
  // check if user exists

  // const userExist = await isUserExist(req.body.email);
  // if (userExist) {
  //   throw new signUpError('Account already exists', 400);
  // }

  req.body.password = await bcrypt.hash(req.body.password, 10);
  try {
    const createUser = await models.user.create(req.body);
    console.log('User', createUser);
    next();
  } catch (error) {
    throw new signUpError(error.errors[0].message, 400);
  }
};

export default signup;
