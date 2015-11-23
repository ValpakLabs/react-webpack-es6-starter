import React from 'react';
import colors, {brand} from '../theme/colors';
import { Link } from 'react-router';
import Flex from './Flex';
import responsive from './responsive';
import Collection from './Collection';

const FeatureBillboard = (props, context) => {
  const size = props.viewportSize || props.size || 'xs';
  const narrow = (size === 'xs' || size === 'sm');

  const height = {
    xs: 300,
    sm: 300,
    md: 360,
    lg: 480
  }[size];

  const styles = {
    ...props.style
  };

  return (
    <Flex style={styles} align='center' justify='center'>
      {props.children}
    </Flex>
  );
};

export default FeatureBillboard;
