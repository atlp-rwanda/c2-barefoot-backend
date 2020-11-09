/* eslint-disable require-jsdoc */
import ApplicationError from './ApplicationError';

class UsersError extends ApplicationError {
  constructor(message) {
    super(message, 400);
  }
}

export default UsersError;