import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import Container from './Container';
import BrandHeader from './BrandHeader';
import Flex from './Flex';
import Icon from './Icon';
import Button from './Button';

class BasePage extends Component {
  render() {
    const user = this.props.user.toJS();
    const {viewportSize} = this.props;
    const isNarrow = (viewportSize === 'xs' || viewportSize === 'sm');

    return (
      <Flex direction='column' align='stretch' style={{background: colors.grey100, minHeight: '100vh'}}>
        <BrandHeader user={user} viewportSize={viewportSize}/>

        {this.props.children}
      </Flex>
    );
  }
}

BasePage.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map),
  viewportSize: PropTypes.string
};

BasePage.defaultProps = {
  user: Immutable.Map(),
  viewportSize: 'xs'
};

export default BasePage;
