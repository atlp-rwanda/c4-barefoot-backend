/* eslint-disable require-jsdoc */
import ApplicationError from './Errors/ApplicationError';

class dbDataNotFoundError extends ApplicationError {
  constructor(message) {
    super(message, 404);
  }
}

export default dbDataNotFoundError;
