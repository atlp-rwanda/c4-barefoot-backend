/* eslint-disable require-jsdoc */
import ApplicationError from './applicationError';

class travelRequestError extends ApplicationError {
  constructor(message) {
    super(message, 400);
  }
}

export default travelRequestError;