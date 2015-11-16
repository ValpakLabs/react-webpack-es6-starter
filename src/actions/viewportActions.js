import {
  UPDATE_VIEWPORT
} from './actionTypes';

export function updateViewport(viewport={}) {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_VIEWPORT,
      payload: viewport
    });
  }
}
