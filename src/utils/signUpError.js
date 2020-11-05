/* eslint-disable require-jsdoc */
import ApplicationError from './applicationError';

class signUpError extends ApplicationError {
  constructor(message) {
    super(message, 400);
  }
}

export default signUpError;
