import ApplicationError from './applicationError';

class userBadRequest extends ApplicationError {
  constructor(message) {
    super(message, 400);
  }
}

export default userBadRequest;
