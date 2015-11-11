import Immutable, {Map, List} from 'immutable';
import { createSelector } from 'reselect';
import {
  UPDATE_VIEWPORT
} from '../actions/actionTypes';

const initialState = {
  width: 320,
  height: 568
};

function updateViewport(state, {payload}) {
  return state
    .set('width', payload.width)
    .set('height', payload.height);
}

function getviewportSize(viewport) {
  const width = viewport.get('width');
  if (width < 480) return 'xs';
  if (width >= 480 && width < 768) return 'sm';
  if (width >= 768 && width < 1024) return 'md';
  if (width >= 1024) return 'lg';
}

export const viewportSizeSelector = createSelector(
  [state => state.viewport],
  (viewport) => {
    return {
      viewportSize: getviewportSize(viewport),
      viewport
    }
  }
);

export default function viewport(state = initialState, action) {
  if (!Map.isMap(state) && !List.isList(state))
    state = Immutable.fromJS(state);

  const handlers = {
    UPDATE_VIEWPORT: updateViewport
  };

  return handlers[action.type] ?
    handlers[action.type](state, action) :
    state;
}
