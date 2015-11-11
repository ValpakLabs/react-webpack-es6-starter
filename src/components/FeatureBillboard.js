import React from 'react';
import colors from '../theme/colors';
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
    color: colors.grey700,
    height: height
  }

  return (
    <Flex style={styles} align='stretch' justify='center'>
      <div style={{overflow: 'hidden', width: '100%'}}>
        
      </div>
    </Flex>
  );
};

export default responsive(FeatureBillboard);
