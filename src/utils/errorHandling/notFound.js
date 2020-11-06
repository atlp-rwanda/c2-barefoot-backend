import ApplicationError from './applicationError';

class notFound extends ApplicationError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = notFound;