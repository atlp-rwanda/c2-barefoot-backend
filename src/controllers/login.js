import bcrypt from 'bcrypt';
import 'express-async-errors';
import jwt from 'jsonwebtoken';
import isUserExist from '../services/findUser';
import ApplicationError from '../utils/ApplicationError';
import BadRequestError from '../utils/badRequestError';
import NotFoundRequestError from '../utils/notFoundRequestError';

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const isUser = await isUserExist(email);
  if (isUser === null) {
    throw new NotFoundRequestError(`You don't have an accoutn with this email: ${email}`, 404);
  }

  if (isUser.verified === false) {
    throw new ApplicationError('Please verify your email first', 403);
  }

  await bcrypt.compare(password, isUser.password, async (error, results) => {
    if (error) {
      throw new BadRequestError(error.message, 400);
    }
    try {
      if (!results) throw new BadRequestError('Password incoreect');
      const userData = {
        id: isUser.id,
        email: isUser.email
      };
      const userToken = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '2h' });
      const refreshToken = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '7d' });
      // updating user refresh token in database
      await isUser.update({ refreshtoken: refreshToken });
      res.cookie('make', refreshToken, { httpOnly: false, path: '/api/v1/user/refresh-token' });
      return res.status(200).json({ status: 200, message: 'login successful', data: userToken });
    } catch (err) {
      next(err);
    }
  });
};

export default login;
