class ApplicationError extends Error{
    constructor(message, status) {
        // Calling parent constructor of base Error class.
        super(message);

        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        this.message = message || 'Something went wrong. Please try again';
        this.status = status || 500;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApplicationError; 