/* eslint-disable require-jsdoc */
import ApplicationError from './ApplicationError';

class NotFoundRequestError extends ApplicationError {
  constructor(message) {
    super(message, 404);
  }
}

export default NotFoundRequestError;
