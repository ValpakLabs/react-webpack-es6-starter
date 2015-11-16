import Immutable, {Map, List} from 'immutable';

export default function config(state = {}, action) {
  if (!Map.isMap(state) && !List.isList(state))
    state = Immutable.fromJS(state);

  return state;
}
