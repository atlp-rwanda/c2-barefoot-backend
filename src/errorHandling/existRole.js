import ApplicationError from './applicationError';

class roleExist extends ApplicationError {
    constructor(message) {
        super(message, 401);
    }
}

module.exports = roleExist;