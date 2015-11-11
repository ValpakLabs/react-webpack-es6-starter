import {PropTypes} from 'react';

export default function responsive(fn) {
  fn.contextTypes = {
    viewportSize: PropTypes.string
  };
  return fn;
}
