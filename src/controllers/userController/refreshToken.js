import jwt from 'jsonwebtoken';
import findUser from '../../servises/findUser';

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.make;
    if (!token) return res.status(400).json({ message: 'no token in cookie', userToken: '' });

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
    if (!newUser) return res.status(400).json({ message: 'no user found with this token', userToken: '' });

    const userToken = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '2h' });
    const reftoken = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '7d' });

    // user.reftoken = reftoken;
    res.cookie('make', reftoken, { httpOnly: true, path: '/api/v1/refresh-token' });
    return res.status(200).json({ userToken });
  } catch (error) {
    console.log(error.message);
  }
};

export default refreshToken;
