import React from 'react';
import colors, {brand} from '../theme/colors';
import { Link } from 'react-router';
import Flex from './Flex';
import responsive from './responsive';

const FeatureBillboard = (props, context) => {
  const size = context.viewportSize || props.size || 'xs';

  const height = {
    xs: 300,
    sm: 300,
    md: 360,
    lg: 480
  }[size];

  const styles = {
    backgroundColor: colors.grey300,
    color: colors.white,
    height: height
  }

  return (
    <Flex style={styles} align='center' justify='center'>
      <Link to='r/theme/thanksgiving'>Visit Promo Page</Link>
    </Flex>
  );
};

export default responsive(FeatureBillboard);
