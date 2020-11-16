/* eslint-disable require-jsdoc */
import ApplicationError from './ApplicationError';

class dbViolationError extends ApplicationError {
  constructor(message) {
    super(message, 400);
  }
}

export default dbViolationError;
