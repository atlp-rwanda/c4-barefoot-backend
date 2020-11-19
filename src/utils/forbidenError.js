/* eslint-disable require-jsdoc */
import ApplicationError from './Errors/applicationError';

class ForbidenRequestError extends ApplicationError {
  constructor(message) {
    super(message, 409);
  }
}

export default ForbidenRequestError;
