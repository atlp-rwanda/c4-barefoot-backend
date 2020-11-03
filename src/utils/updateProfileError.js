/* eslint-disable require-jsdoc */
import ApplicationError from './applicationError';

class UpdateProfileError extends ApplicationError {
  constructor(message) {
    super(message, 404);
  }
}

export default UpdateProfileError;
