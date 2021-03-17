/* eslint-disable require-jsdoc */
import ApplicationError from './applicationError';

class accessDenied extends ApplicationError {
  constructor(message) {
    super(message, 403);
  }
}

export default accessDenied;
