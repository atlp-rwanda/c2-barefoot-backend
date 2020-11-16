/* eslint-disable require-jsdoc */
import ApplicationError from './applicationError';

class UnProcessedError extends ApplicationError {
  constructor(message) {
    super(message, 403);
  }
}

export default UnProcessedError;
