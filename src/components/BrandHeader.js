import React, { Component, PropTypes } from 'react';
import colors, {brand} from '../theme/colors';
import responsive from './responsive';
import Container from './Container';
import Header from './Header';
import BrandLogo from './BrandLogo';
import Search from './Search';
import Flex from './Flex';
import Icon from './Icon';
import Flyout from './Flyout';
import Button from './Button';
import Dropdown from './Dropdown';

class BrandHeader extends Component {
  render() {
    let {viewportSize} = this.context;

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

            {(viewportSize === 'xs' || viewportSize === 'sm') &&
              <Button icon='menu' color={colors.white} onClick={e => this.context.toggleBrandDrawer()}/>}

            <BrandLogo />

            {viewportSize !== 'xs' && viewportSize !== 'sm' ?
              <Flex align='stretch' justify='flex-end' flex={1}>
                <Search />

                <Dropdown
                  style={{marginRight: 10}}
                  label='Browse'
                  buttonProps={{
                    fill: brand.tertiary,
                    color: colors.white,
                    icon: 'arrow_drop_down'
                  }}
                  dropdownStyles={{
                    color: colors.white,
                    background: brand.tertiary
                  }}>
                  <div>
                    <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.15)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={6} name='chevron_right'/> <div>In-Store Coupons</div></Flex>
                    <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.15)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={6} name='chevron_right'/> <div>Online Codes</div></Flex>
                    <Flex style={{padding: '10px 8px'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={6} name='chevron_right'/> <div>Grocery Coupons</div></Flex>
                  </div>
                </Dropdown>

                <Dropdown
                  label='Your Account'
                  buttonProps={{
                    fill: brand.tertiary,
                    color: colors.white,
                    icon: 'arrow_drop_down'
                  }}
                  dropdownStyles={{
                    color: colors.white,
                    background: brand.tertiary,
                    padding: 20}}
                  >
                  <div>Check me out!</div>
                </Dropdown>

              </Flex> :
              <Button icon='search' color={colors.white}/>}
          </Flex>

          <Flyout
            offset={6}
            bgcolor={colors.white}
            padding={0}
            closeOnClick={true}
            width={240}
            position='below'
            halign='right'
            ref='flyout_browseMenu'
            target='header_browseMenuButton'>
            <div style={{padding: 20}}>Check me out!</div>
          </Flyout>

        </Container>
      </Header>
    )
  };
}

BrandHeader.contextTypes = {
  viewportSize: PropTypes.string,
  toggleBrandDrawer: PropTypes.func
}

export default BrandHeader;
