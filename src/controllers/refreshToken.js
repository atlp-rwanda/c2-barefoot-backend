import jwt from 'jsonwebtoken';
import findUser from '../services/findUser';
import BadRequestError from '../utils/badRequestError';

const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.make;
    try {
      if (!token) {
        throw new BadRequestError('no token in cookie', 400);
      }
    } catch (e) {
      next(e);
    }
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    // check if user exist in databasa
    const newUser = await findUser(payload.email);
    const userData = {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      address: newUser.address,
      language: newUser.language,
      profile_picture: newUser.profile_picture
    };
    if (!newUser) {
      throw new BadRequestError('no user found with this token', 400);
    }
    const userToken = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '2h' });
    const reftoken = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '7d' });

    // user.reftoken = reftoken;
    res.cookie('make', reftoken, { httpOnly: false, path: '/api/v1/user/refresh-token' });
    return res.status(200).json({ userToken });
  } catch (error) {
    console.log(error.message);
  }
};

export default refreshToken;
