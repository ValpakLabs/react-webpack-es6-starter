import React, {Component, PropTypes} from 'react';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import Header from './Header';
import Flex from './Flex';
import Button from './Button';
import Icon from './Icon';

class BrandDrawer extends Component {

  render() {
    const {geo} = this.props.user;

    const styles = {
      base: {
        position: 'fixed',
        width: 260,
        top: 0,
        right: 260,
        bottom: 0,
        left: 0,
        color: colors.white,
        overflowY: 'scroll',
        background: Color(brand.primary).lighten(0.3).rgbString()
      }
    };

    return (
      <Flex style={styles.base} direction='column' align='stretch' justify='space-between'>

        <Header color={brand.primary}>
          <div style={{marginLeft: 16}}>
            <img style={{display: 'block', height: 24}} src='img/valpak.wordmark.1c.reversed.png'/>
          </div>
        </Header>

        <Flex align='stretch' direction='column' flex={1}>
          <div>
            <Flex style={{height: 60, padding: '0px 10px', borderBottom: '1px solid rgba(0,0,0,0.15)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={6} name='chevron_right'/> <div>In-Store Coupons</div></Flex>
            <Flex style={{height: 60, padding: '0px 10px', borderBottom: '1px solid rgba(0,0,0,0.15)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={6} name='chevron_right'/> <div>Online Codes</div></Flex>
            <Flex style={{height: 60, padding: '0px 10px', borderBottom: '1px solid rgba(0,0,0,0.15)'}} align='center'><Icon fill={colors.lightgreen500} size={16} pushRight={6} name='chevron_right'/> <div>Grocery Coupons</div></Flex>
          </div>
        </Flex>

        <Flex style={{background: brand.tertiary, height: 60}} justify='center' align='center'>
          <Button {...{
            icon: 'location_on',
            iconRight: false,
            weight: 600,
            color: colors.white,
            style: {fontSize: 14},
            onClick: e => this.context.openModal('geo')
          }}>
            {`${geo.city}, ${geo.state} ${geo.postalCode}`}
          </Button>
        </Flex>

      </Flex>
    );
  }

}

BrandDrawer.contextTypes = {
  openModal: PropTypes.func
}

export default BrandDrawer;
