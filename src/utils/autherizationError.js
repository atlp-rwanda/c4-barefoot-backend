/* eslint-disable require-jsdoc */
import ApplicationError from './applicationError';

class VerifyTokenError extends ApplicationError {
  constructor(message) {
    super(message, 401);
  }
}

export default VerifyTokenError;
