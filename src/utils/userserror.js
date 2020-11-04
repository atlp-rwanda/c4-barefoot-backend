/* eslint-disable require-jsdoc */
import ApplicationError from './applicationError';

class UsersError extends ApplicationError {
  constructor(message) {
    super(message, 404);
  }
}

export default UsersError;
