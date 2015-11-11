import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';

import {
  promiseMiddleware,
  thunkMiddleware,
} from './middleware';

import Immutable from 'immutable';
import logger from 'redux-logger';

export default function (data) {
  try {
    const middleware = __DEVELOPMENT__ ?
      applyMiddleware(promiseMiddleware, thunkMiddleware, logger({
        collapsed: true,
        duration: true,
        transformer: (state) => {
          var newState = {};
          for (var i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
              newState[i] = state[i].toJS();
            } else {
              newState[i] = state[i];
            }
          };
          return newState;
        }
      })) :
      applyMiddleware(promiseMiddleware, thunkMiddleware)

    const createCustomStore = compose(middleware)(createStore);

    // if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    //   const { devTools, persistState } = require('redux-devtools');
    //   createCustomStore = compose(
    //     middleware,
    //     devTools(),
    //     persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    //   )(createStore);
    // } else {
    //   createCustomStore = compose(middleware)(createStore);
    // }

    const reducer = combineReducers(require('../reducers/index'));
    const store = createCustomStore(reducer, data);

    if (module.hot) {
      module.hot.accept('../reducers/index', () => {
        const nextReducer = combineReducers(require('../reducers/index'));
        store.replaceReducer(nextReducer);
      });
    }

    return store;

  } catch (error) {
    throw error;
  }
}
