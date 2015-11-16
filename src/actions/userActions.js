import {
  SET_USER_GEO,
  SET_USER_GEO_SUCCESS,
  SET_USER_GEO_FAIL
} from './actionTypes';

export function setUserGeo(geoString) {
  return {
    types: [SET_USER_GEO, SET_USER_GEO_SUCCESS, SET_USER_GEO_FAIL],
    promise: client => client.setUserGeo(geoString)
  };
}
