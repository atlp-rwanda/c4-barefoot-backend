import userServices from '../../services/user.service';
import { verifyToken} from '../../utils/auth';
import AuthorizationError from '../../utils/Errors/authorizationError';
import BadRequestError from '../../utils/Errors/badRequestError';
import ApplicationError from '../../utils/Errors/applicationError';
import NotFoundRequestError from '../../utils/Errors/notFoundRequestError';

const verifyResetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { password, confirmPassword } = req.body;

    
    const decodedToken = await verifyToken(token);
    if (decodedToken.username === undefined) throw new AuthorizationError('Invalid Token');
    if (password !== confirmPassword) throw new BadRequestError('Passwords do not match');

    const record = await userServices.getUserByUserName(decodedToken.username);
    if (!record) {
      throw new NotFoundRequestError('Account does not exist');
    }
    //check if the token was used
    if(record.refreshtoken === token){throw new ApplicationError("Can not reset the password again! Token expired.")}
    const updatePassword = userServices.updateUserByUsername({password:password},decodedToken.username);
    
    if(updatePassword){
      //update the used token
      const updateToken = userServices.updateUserByUsername({refreshtoken:token},decodedToken.username);
      return res.status(200).json({ status: 200, message: 'Password reset successfully' });
    }else{ 
      throw new ApplicationError("Failed to reset this password, please Try again!");
    }
    
  } catch (err) { next(err); }
};

export default verifyResetPassword;

