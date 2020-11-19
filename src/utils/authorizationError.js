/* eslint-disable require-jsdoc */
import ApplicationError from './Errors/applicationError';

class AuthorizationError extends ApplicationError {
  constructor(message) {
    super(message, 401);
  }
}

export default AuthorizationError;
