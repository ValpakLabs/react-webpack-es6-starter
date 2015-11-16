import React from 'react';
import Flex from './Flex';
import responsive from './responsive';

const defaultProps = {
  height: '60px',
  color: '#111',
  show: true,
  size: 'xs'
};

const Header = (props, context) => {
  props = {...defaultProps, ...props};

  const styles = {
    backgroundColor: props.color,
    height: {
      xs: 60,
      sm: 60,
      md: 72,
      lg: 72
    }[context.viewportSize || props.size],
    ...props.style
  };

  return (
    <Flex align='center' style={styles}>
      {props.children}
    </Flex>
  );
}

export default responsive(Header);
