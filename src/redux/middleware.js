if (__SERVER__)
  var winston = require('winston');

export function promiseMiddleware(client) {
  return ({dispatch, getState}) =>
    next => async action => {
      const { promise, types, ...rest } = action;

      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      try {
        const payload = await promise(client);
        next({...rest, payload, type: SUCCESS});
      } catch (error) {
        next({
          ...rest,
          payload: error.stack || error,
          error: true,
          type: FAILURE,
          meta: {
            entity: action.payload
          }
        });
      }
    };
}

export function thunkMiddleware({ dispatch, getState }) {
  return next => async action => {
    if (typeof action === 'function') {
      await action(dispatch, getState);
    } else {
      next(action);
    }
  };
}

export function errorLogger({ dispatch, getState }) {
  return next => action => {
    if (!action.error)
      return next(action);

    if (winston)
      winston.loggers.get('error').error(action.payload);
    else
      console.error(action.payload);

    return next(action);
  };
}
