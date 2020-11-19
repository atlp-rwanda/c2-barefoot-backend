import userServices from '../../services/user.service';
import { verifyToken} from '../../utils/auth';
import AuthorizationError from '../../utils/Errors/authorizationError';
import BadRequestError from '../../utils/Errors/badRequestError';
import ApplicationError from '../../utils/Errors/applicationError';
import NotFoundRequestError from '../../utils/Errors/notFoundRequestError';
let usedToken ='';

const verifyResetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { password, confirmPassword } = req.body;

    if(usedToken === token){throw new ApplicationError("Can not reset the password again!")}
    const decodedToken = await verifyToken(token);
    if (decodedToken.username === undefined) throw new AuthorizationError('Invalid Token');
    if (password !== confirmPassword) throw new BadRequestError('Passwords do not match');

    const record = await userServices.getUserByUserName(decodedToken.username);
    if (!record) {
      throw new NotFoundRequestError('Account does not exist');
    }
    const updatePassword = userServices.updateUserByUsername({password:password},decodedToken.username);
    if(updatePassword){
      usedToken = token;
      return res.status(200).json({ status: 200, message: 'Password reset successfully' });
    }else{ 
      throw new ApplicationError("Failed to reset this password, please Try again!");
    }
    
  } catch (err) { next(err); }
};

export default verifyResetPassword;

