import React from 'react';
import colors, {brand} from '../theme/colors';
import responsive from './responsive';
import Container from './Container';
import Header from './Header';
import BrandLogo from './BrandLogo';
import Search from './Search';
import Flex from './Flex';
import Icon from './Icon';

const BrandHeader = (props, context) => {
  const {viewportSize} = context;

  const headerButtonStyles = {
    padding: '0 18px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: colors.white,
    borderRadius: 3
  };

  return (
    <Header color={brand.primary}>
      <Container>
        <Flex
          align='center'
          justify={'space-between'}>

          {(viewportSize === 'xs' || viewportSize === 'sm') && <Icon name='menu' fill={colors.white}/>}

          <BrandLogo />

          {viewportSize !== 'xs' && viewportSize !== 'sm' ?
            <Flex align='stretch' justify='flex-end' flex={1}>
              <Search />
              <Flex align='center' style={{...headerButtonStyles, marginRight: 12, paddingRight: 10}}>Browse <Icon style={{marginLeft: 6}} name='arrow_drop_down' /></Flex>
              <Flex align='center' style={{...headerButtonStyles, marginRight: 12, paddingRight: 10}}>Your Account<Icon style={{marginLeft: 6}} name='arrow_drop_down' /></Flex>
            </Flex> :
            <Icon name='search' fill={colors.white}/>}
        </Flex>
      </Container>
    </Header>
  )
};

export default responsive(BrandHeader);
