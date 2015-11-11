import React from 'react';
import colors, {brand} from '../theme/colors';
import responsive from './responsive';
import Container from './Container';
import Heading from './Heading';
import Flex from './Flex';
import Icon from './Icon';

const FeaturedCategoryBar = (props, context) => {
  const {viewportSize} = context;

  const styles = {
    background: colors.grey50,
    borderBottom: `1px solid ${colors.grey200}`,
    padding: '12px 0'
  };

  const linkBarStyles = {
    fontWeight: 600,
    color: brand.primary,
    padding: '6px 12px',
    margin: '0 0 0 12px',
    // background: colors.grey200,
    borderRadius: 3,
    cursor: 'pointer'
  }

  return (
    <div style={styles}>
      <Container>
        <Flex align='center'>
          <Heading level={5} weight={700} flex={1}>Top Categories in Los Angeles, CA</Heading>
          <Flex style={linkBarStyles}>Hair Cuts</Flex>
          <Flex style={linkBarStyles}>Restaurants</Flex>
          <Flex style={linkBarStyles}>Automotive</Flex>
          <Flex style={linkBarStyles}>Electronics</Flex>
          <Flex style={linkBarStyles}>Grocery</Flex>
          <Flex style={linkBarStyles}>More...</Flex>
        </Flex>
      </Container>
    </div>
  )
};

export default responsive(FeaturedCategoryBar);
