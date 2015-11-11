import React from 'react';

const defaultProps = {
  flex: 'none',
  level: 1,
  pushEnds: 1,
  weight: 300,
  color: 'inherit',
  textAlign: 'left'
}

const sizes = {
  1: 36,
  2: 32,
  3: 24,
  4: 18,
  5: 16,
  6: 14
};

const Heading = (props, context) => {
  props = {...defaultProps, ...props};

  const fontSize = sizes[props.level];

  const styles = {
    color: props.color,
    fontSize: fontSize,
    lineHeight: props.lineHeight || `${fontSize / 24}em`,
    marginTop: props.pushEnds * fontSize / 2,
    marginBottom: props.pushEnds * fontSize / 2,
    fontWeight: props.weight,
    flex: props.flex,
    textAlign: props.textAlign,
    ...props.style
  };

  return (
    <div style={styles}>{props.children}</div>
  );
};

export default Heading
