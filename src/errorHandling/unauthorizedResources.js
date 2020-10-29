import ApplicationError from './applicationError';

class unauthaurizedResources extends ApplicationError {
    constructor(message) {
        super(message, 401);
    }
}

module.exports = unauthaurizedResources;