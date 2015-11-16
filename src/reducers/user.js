import Immutable, {Map, List} from 'immutable';

import {
  LOAD_USER_DEVICE,
  SET_USER_GEO,
  SET_USER_GEO_SUCCESS,
  SET_USER_GEO_FAIL
} from '../actions/actionTypes';

const initialState = {
  device: {},
  geo: {}
};

function loadUserDevice(state, {payload}) {
  return state;
}

function setUserGeo(state, {payload}) {
  return state;
}

function setUserGeoSuccess(state, {payload}) {
  return state.set('geo', payload);
}

function setUserGeoFail(state, action) {
  return state;
}

export default function viewport(state = initialState, action) {
  if (!Map.isMap(state) && !List.isList(state))
    state = Immutable.fromJS(state);

  const handlers = {
    LOAD_USER_DEVICE: loadUserDevice,
    SET_USER_GEO: setUserGeo,
    SET_USER_GEO_SUCCESS: setUserGeoSuccess,
    SET_USER_GEO_FAIL: setUserGeoFail
  };

  return handlers[action.type] ?
    handlers[action.type](state, action) :
    state;
}
