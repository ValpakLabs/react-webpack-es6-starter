import React, {PropTypes} from 'react';
import colors, {brand} from '../theme/colors';
import responsive from './responsive';
import Container from './Container';
import Heading from './Heading';
import Flex from './Flex';
import Icon from './Icon';
import Button from './Button';
import Dropdown from './Dropdown';

const FeaturedCategoryBar = (props, context) => {
  const {viewportSize} = context;
  const {geo} = props;

  const styles = {
    background: colors.grey100,
    borderBottom: `1px solid ${colors.grey300}`,
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
        <Flex align='center' justify='space-between'>
          <Button
            icon='location_on'
            iconRight={false}
            weight={600}
            fill={brand.primary}
            color={colors.white}
            style={{fontSize: 14}}
            onClick={e => context.openModal('geo')}>
            {`${geo.city}, ${geo.state} ${geo.postalCode}`}
          </Button>

          <Flex>
            <Flex style={linkBarStyles}>Hair Cuts</Flex>
            <Flex style={linkBarStyles}>Restaurants</Flex>
            <Flex style={linkBarStyles}>Automotive</Flex>
            <Flex style={linkBarStyles}>Electronics</Flex>
            <Flex style={linkBarStyles}>Grocery</Flex>
            <Flex style={linkBarStyles}>More...</Flex>
          </Flex>
        </Flex>
      </Container>
    </div>
  )
};

FeaturedCategoryBar.contextTypes = {
  openModal: PropTypes.func
};

export default FeaturedCategoryBar;
