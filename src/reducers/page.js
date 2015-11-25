import Immutable, {Map, List} from 'immutable';
import {
  FETCH_BALEFIRE_PAGE,
  FETCH_BALEFIRE_PAGE_SUCCESS,
  FETCH_BALEFIRE_PAGE_FAIL,
  FETCH_COLLECTION,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAIL
} from '../actions/actionTypes';

let initialState = {
  balefire: {},
  collection: {}
};

function fetchPage(state, action) {
  return state;
}

function fetchPageSuccess(state, action) {
  return state.set('balefire', Immutable.fromJS(action.payload));
}

function fetchPageFail(state, action) {
  return state;
}

function fetchCollection(state, action) {
  return state;
}

function fetchCollectionSuccess(state, action) {
  return state.set('collection', Immutable.fromJS(action.payload));
}

function fetchCollectionFail(state, action) {
  return state;
}

export default function page(state = initialState, action) {
  if (!Map.isMap(state) && !List.isList(state))
    state = Immutable.fromJS(state);

  const handlers = {
    FETCH_BALEFIRE_PAGE: fetchPage,
    FETCH_BALEFIRE_PAGE_SUCCESS: fetchPageSuccess,
    FETCH_BALEFIRE_PAGE_FAIL: fetchPageFail,
    FETCH_COLLECTION: fetchCollection,
    FETCH_COLLECTION_SUCCESS: fetchCollectionSuccess,
    FETCH_COLLECTION_FAIL: fetchCollectionFail
  };

  return handlers[action.type] ?
    handlers[action.type](state, action) :
    state;
}
