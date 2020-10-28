class ApplicationError extends Error {
  constructor(message, statusCode){
    super(message);
    this.name = this.constructor.name;
    this.message = message || 'Something went wrong. Please try again';
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
};

export default ApplicationError;
