import React from 'react';
import Flex from './Flex';
import responsive from './responsive';

let BrandLogo = (props, context) => {
  const size = context.viewportSize || props.size || 'xs';

  const width = {
    xs: 90,
    sm: 90,
    md: 110,
    lg: 110
  }[size];

  const logoPath = {
    xs: '/img/ValpakLogo.H.4C.reverse.png',
    sm: '/img/ValpakLogo.H.4C.reverse.png',
    md: '/img/ValpakLogo.H.4C.reverse.png',
    lg: '/img/ValpakLogo.H.4C.reverse.png'
  }[size];

  const styles = {
    display: 'block',
    maxHeight: '100%',
    width
  };

  return (
    <Flex>
      <img style={styles} src={logoPath} />
    </Flex>
  );
};

export default responsive(BrandLogo);
