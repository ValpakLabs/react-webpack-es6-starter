import Immutable, {Map, List} from 'immutable';
import { createSelector } from 'reselect';

import {
  LOAD_USER_DEVICE
} from '../actions/actionTypes';

const initialState = {

};

function loadUserDevice(state, {payload}) {
  return state
    .set('device', payload);
}

export default function viewport(state = initialState, action) {
  if (!Map.isMap(state) && !List.isList(state))
    state = Immutable.fromJS(state);

  const handlers = {
    LOAD_USER_DEVICE: loadUserDevice
  };

  return handlers[action.type] ?
    handlers[action.type](state, action) :
    state;
}
