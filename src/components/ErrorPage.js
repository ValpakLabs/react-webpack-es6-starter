import React, { Component, PropTypes } from 'react';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import BasePage from './BasePage';
import Container from './Container';
import Flex from './Flex';
import Heading from './Heading';
import Icon from './Icon';
import Button from './Button';

class ErrorPage extends Component {
  render() {
    const { user, viewportSize } = this.props;
    const isNarrow = (viewportSize === 'xs' || viewportSize === 'sm');

    return (
      <BasePage {...this.props}>

        <Flex flex={1} align='center' justify='center' direction='column' style={{margin: isNarrow ? 20 : 60}}>
          <Icon name='watch_later' size={120} fill={colors.red500}/>
          <div style={{marginTop: 24, fontSize: isNarrow ? 18 : 24, lineHeight: isNarrow ? '24px' : '36px', textAlign: 'center'}}>This page is down for maintenance. <br/>It should back up in no time!</div>
        </Flex>

      </BasePage>
    );
  }
}

export default ErrorPage;
