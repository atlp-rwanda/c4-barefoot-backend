/* eslint-disable require-jsdoc */
import ApplicationError from './Errors/applicationError';

class dbViolationError extends ApplicationError {
  constructor(message) {
    super(message, 400);
  }
}

export default dbViolationError;
