export class AppError extends Error {
  constructor(message) {
    super();
    this.name = 'AppError';
    this.code = 'ApplicationError';
    this.message = message;
    this.status = 500;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthorizationError extends Error {
  constructor(message) {
    super();
    this.name = 'AuthorizationError';
    this.code = 'NotAuthorized';
    this.status = 401;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends Error {
  constructor(message) {
    super();
    this.name = 'AuthenticationError';
    this.code = 'AuthenticationFailed';
    this.status = 403;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = 'NotFoundError';
    this.code = 'NotFound';
    this.status = 404;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class RequestError extends Error {
  constructor(message) {
    super();
    this.name = 'RequestError';
    this.code = 'BadRequest';
    this.status = 400;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}
