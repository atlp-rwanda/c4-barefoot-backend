// Signup page controller
import models from '../../models';
import signUpError from '../../utils/Errors/badRequestError';
import isUserExist from '../../services/findUser';
import 'express-async-errors';

const signup = async (req, res, next) => {
  // check if user exists

  const userExist = await isUserExist(req.body.email);
  if (userExist) {
    throw new signUpError(('Account already exists'), 400);
  }
  // create the user
  try {
    const createUser = await models.User.create(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export default signup;
