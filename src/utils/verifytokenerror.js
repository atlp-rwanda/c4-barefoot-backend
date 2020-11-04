/* eslint-disable require-jsdoc */
import ApplicationError from './applicationError';

class VerifyTokenError extends ApplicationError {
  constructor(message) {
    super(message, 404);
  }
}

export default VerifyTokenError;
