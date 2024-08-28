


class ErrorHandler extends Error{
    constructor(name, message, statusCode = 500, isTrusted = true, cause = null) {
        super(message);
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        this.isTrusted = isTrusted;
        this.cause = cause;
      }
}


class ValidationError extends ErrorHandler {
    constructor(message, cause = null) {
      super('ValidationError', message, 400, true, cause);
    }
  }

export {ErrorHandler,ValidationError};