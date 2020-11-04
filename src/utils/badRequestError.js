/* eslint-disable require-jsdoc */
import ApplicationError from './ApplicationError';

class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message, 400);
  }
}

export default BadRequestError;
