import {
  UPDATE_VIEWPORT
} from './actionTypes';

export function updateViewport(viewport={}) {
  return {
    type: UPDATE_VIEWPORT,
    payload: viewport
  };
}
