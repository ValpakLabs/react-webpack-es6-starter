export function promiseMiddleware({dispatch, getState}) {
  return next => async action => {
    const { promise, types, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});

    try {
      const payload = await promise();
      next({...rest, payload, type: SUCCESS});
    } catch (error) {
      next({
        ...rest,
        payload: error,
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

export function loggingMiddleware({dispatch, getState}) {
  return next => action => {
    if (__DEVELOPMENT__ && __CLIENT__) {
      console.log(`%cDispatch: %c${action.type}: %o`, 'color: #AAA', 'color: orange; font-weight: bold', action);
    }
    next(action);
  };
}
