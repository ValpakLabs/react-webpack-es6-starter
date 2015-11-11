import React from 'react';

const defaultProps = {
  display: 'flex',
  direction: 'row',
  align: 'flex-start',
  justify: 'flex-start',
  flex: 'none',
  wrap: 'nowrap',
  alignSelf: 'auto'
}

const Flex = (props) => {
  props = {...defaultProps, ...props};

  const styles = {
    display: props.display,
    flexDirection: props.direction,
    alignItems: props.align,
    justifyContent: props.justify,
    flex: props.flex,
    alignSelf: props.alignSelf,
    flexWrap: props.wrap,
    ...props.style
  };

  return (
    <div {...props} style={styles}>{props.children}</div>
  )
};

export default Flex;
