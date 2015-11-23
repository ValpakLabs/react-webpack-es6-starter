import React, { Component, PropTypes } from 'react';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import { Link } from 'react-router';
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
    const {geo} = this.props.user;
    let {viewportSize} = this.context;
    let narrow = viewportSize === 'xs' || viewportSize === 'sm';

    const styles = {
      base: {
        position: 'relative',
        zIndex: 2
      },
      primaryHeader: {
        background: `linear-gradient(${Color(brand.primary).lighten(0.2).rgbaString()}, ${brand.primary})`,
        borderTop: `1px solid ${Color(brand.primary).lighten(0.45).rgbaString()}`
      },
      subHeader: {
        background: Color(brand.primary).darken(0.05).rgbaString(),
        borderBottom: `1px solid ${Color(brand.primary).darken(0.25).rgbaString()}`,
        color: colors.white
      },
      subHeaderContainer: {
        height: 36
      },
      subHeaderLink: {
        padding: '0 24px',
        color: colors.white,
        textDecoration: 'none',
        display: 'flex',
        alignSelf: 'stretch',
        alignItems: 'center',
        cursor: 'pointer',
        borderRight: `1px solid rgba(255, 255, 255, 0.1)`
      }
    };

    return (
      <Flex direction='column' align='stretch' style={styles.base}>

        {!narrow &&
          <Flex style={styles.subHeader}>
            <Container style={styles.subHeaderContainer}>
              <Flex align='center' justify='flex-end' style={{height: '100%'}}>
                <div style={styles.subHeaderLink} onClick={e => this.context.openModal('geo')}><Icon size={18} pushRight={5} name='location_on' fill={brand.secondary}/>{`${geo.city}, ${geo.state} ${geo.postalCode}`}</div>
                <Link to='' style={styles.subHeaderLink}>Become a Member</Link>
                <Link to='' style={styles.subHeaderLink}>Sign In</Link>
              </Flex>
            </Container>
          </Flex>
        }

        <Header style={styles.primaryHeader}>
          <Container>
            <Flex
              align='center'
              justify={'space-between'}>

              {(viewportSize === 'xs' || viewportSize === 'sm') &&
                <Button icon='menu' color={colors.white} onTouchEnd={e => this.context.toggleBrandDrawer()}/>}

              <BrandLogo />

              {viewportSize !== 'xs' && viewportSize !== 'sm' ?
                <Flex align='stretch' justify='flex-end' flex={1}>
                  <Search />

                  <Dropdown
                    style={{marginRight: 12}}
                    width={180}
                    label='Browse Coupons'
                    buttonProps={{
                      fill: brand.tertiary,
                      color: colors.white,
                      icon: 'arrow_drop_down'
                    }}
                    openButtonProps={{
                      fill: colors.white,
                      color: colors.black
                    }}
                    dropdownStyles={{
                      color: colors.black,
                      background: colors.white
                    }}>
                    <div>
                      <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.1)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>In-Store</div></Flex>
                      <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.1)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>Online</div></Flex>
                      <Flex style={{padding: '10px 8px'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>Grocery</div></Flex>
                    </div>
                  </Dropdown>

                  <Dropdown
                    width={180}
                    label='Categories'
                    buttonProps={{
                      fill: brand.tertiary,
                      color: colors.white,
                      icon: 'arrow_drop_down'
                    }}
                    openButtonProps={{
                      fill: colors.white,
                      color: colors.black
                    }}
                    dropdownStyles={{
                      color: colors.black,
                      background: colors.white
                    }}>
                    <div>
                      <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.1)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>Automotive</div></Flex>
                      <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.1)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>Restaurants</div></Flex>
                      <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.1)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>Personal Care</div></Flex>
                      <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.1)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>Health</div></Flex>
                      <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.1)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>Entertainment</div></Flex>
                      <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.1)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>Home & Office</div></Flex>
                      <Flex style={{padding: '10px 8px', borderBottom: '1px solid rgba(0,0,0,0.1)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>General Services</div></Flex>
                      <Flex style={{padding: '10px 8px'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={4} name='chevron_right'/> <div>Grocery</div></Flex>
                    </div>
                  </Dropdown>

                </Flex> :
                <Button icon='search' color={colors.white} onTouchEnd={e => this.context.openModal('search')}/>}
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
      </Flex>
    );
  };
}

BrandHeader.contextTypes = {
  viewportSize: PropTypes.string,
  toggleBrandDrawer: PropTypes.func,
  openModal: PropTypes.func
};

export default BrandHeader;
