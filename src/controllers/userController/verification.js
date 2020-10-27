// verification controller
import jwt from 'jsonwebtoken';
import models from '../../models';
import 'dotenv/config';

const verification = async (req, res) => {
  const updateUser = async (user) => {
    try {
      const record = await models.user.findOne({ where: { email: user } });
      if (record.verified === false) {
        models.user.update({ verified: true }, { where: { email: user } });
        return res.status(200).json({ Message: 'Email has been verified' });
      }
      return res.status(400).json({ Message: 'account already verified' });
    } catch (error) {
      return res.status(400).json({ Error: 'Account does not exist' });
    }
  };

  jwt.verify(req.params.token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(400).json({ Message: 'Invalid token' });
    updateUser(user.user);
  });
};

export default verification;
