import ApplicationError from '../Errors/applicationError';

class accessDenied extends ApplicationError {
    constructor(message) {
        super(message, 403);
    }
}

module.exports = accessDenied;