import {AppError} from '../utils/errors';

export default function(app) {
  return function(err, req, res, next) {
    switch (err.name) {
      case 'RequestError':
        res.status(err.status || 400).json(err);
        break;
      case 'AuthorizationError':
        res.status(err.status || 401).json(err);
        break;
      case 'UnauthorizedError':
        res.status(err.status || 401).json(err);
        break;
      case 'AuthenticationError':
        res.status(err.status || 403).json(err);
        break;
      case 'NotFoundError':
        res.status(err.status || 404).json(err);
        break;
      case 'AppError':
        res.status(err.status || 500).json(err);
        break;
      default:
        const error = new AppError('Something went wrong.');
        console.error(err.stack);
        res.status(err.status || 500).json(error);
    }
  }
}
