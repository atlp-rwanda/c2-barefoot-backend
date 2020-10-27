import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isUserExist from '../helper/findUser'

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await isUserExist(email);
    if (isUser === null) return res.status(404).json({ status: 404, message: `You don\'t have an accoutn with this email: ${email}` });

    if (isUser.verified === false) return res.status(403).json({ status: 403, message: 'Please verify your email first' });

    bcrypt.compare(password, isUser.password, (error, results) => {
      if (error) return res.status(400).json({ status: 400, errors: error.message });
      if (!results) return res.status(400).json({ status: 400, message: 'Password incoreect' });
      const userData = {
        id: isUser.id, first_name: isUser.first_name, last_name: isUser.last_name, email: isUser.email, address: isUser.address, language: isUser.language, profile_picture: isUser.profile_picture
      };
      const userToken = jwt.sign({ userData }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ status: 200, message: 'login successful', data: userToken });
    });
  } catch (error) {
    console.log(error);
  }
};

export default login;
