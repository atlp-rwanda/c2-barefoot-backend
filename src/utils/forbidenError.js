/* eslint-disable require-jsdoc */
import ApplicationError from './applicationError';

class ForbidenRequestError extends ApplicationError {
  constructor(message) {
    super(message, 409);
  }
}

export default ForbidenRequestError;
