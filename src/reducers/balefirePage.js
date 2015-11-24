import Immutable, {Map, List} from 'immutable';
import {
  FETCH_BALEFIRE_PAGE,
  FETCH_BALEFIRE_PAGE_SUCCESS,
  FETCH_BALEFIRE_PAGE_FAIL
} from '../actions/actionTypes';

let initialState = {};

function fetchPage(state, action) {
  return state;
}

function fetchPageSuccess(state, action) {
  return Immutable.fromJS(action.payload);
}

function fetchPageFail(state, action) {
  return state;
}

export default function balefirePage(state = initialState, action) {
  if (!Map.isMap(state) && !List.isList(state))
    state = Immutable.fromJS(state);

  const handlers = {
    FETCH_BALEFIRE_PAGE: fetchPage,
    FETCH_BALEFIRE_PAGE_SUCCESS: fetchPageSuccess,
    FETCH_BALEFIRE_PAGE_FAIL: fetchPageFail
  };

  return handlers[action.type] ?
    handlers[action.type](state, action) :
    state;
}
