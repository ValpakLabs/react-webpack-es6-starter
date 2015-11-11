
import React from 'react';
import responsive from './responsive';

let Container = (props, context) => {
  const size = context.viewportSize || props.size || 'xs';

  const maxWidth = {
    xs: '100%',
    sm: '100%',
    md: '100%',
    lg: 1024
  }[size];

  let sidePadding = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 0
  }[size];

  const styles = {
    padding: `0 ${sidePadding}px`,
    margin: '0 auto',
    width: '100%',
    maxWidth,
    ...props.style
  };

  return (
    <div style={styles}>{props.children}</div>
  );
};

export default responsive(Container);
