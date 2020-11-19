/* eslint-disable require-jsdoc */
import ApplicationError from './Errors/applicationError';

class UnProcessedError extends ApplicationError {
  constructor(message) {
    super(message, 403);
  }
}

export default UnProcessedError;
