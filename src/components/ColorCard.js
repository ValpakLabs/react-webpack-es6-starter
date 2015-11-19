import React, {PropTypes, Component} from 'react';
import {findDOMNode} from 'react-dom';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import responsive from './responsive';
import Flex from './Flex';
import Heading from './Heading';
import Icon from './Icon';

class ColorCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      expanded: false
    }
  }

  render() {
    const {props} = this;
    const {fill} = props;

    const styles = {
      backgroundColor: fill,
      cursor: 'pointer',
      ...props.style
    };

    const innerCardStyles = {
      color: colors.white,
      margin: 0,
      width: '100%',
      textAlign: 'center'
    }

    const innerCardLogoStyles = {
      width: 50,
      height: 'auto',
      padding: 0,
      marginRight: 10,
      marginTop: 3,
      backgroundColor: colors.white
    };

    const innerCardLogoImageStyles = {
      display: 'block',
      maxWidth: '100%'
    };

    return (
      <Flex
        flex={props.flex}
        alignSelf={props.alignSelf}
        align='center'
        justify='center'
        style={styles}
        onMouseEnter={::this.enter}
        onMouseLeave={::this.leave}>
        <Flex style={innerCardStyles} justify='center' align='center' direction='column'>
          <Flex>
            <div style={{width: 72, height: 72, marginBottom: 8}}>
              <img style={{fill: colors.white, color: colors.white, display: 'block', maxWidth: '100%'}} src={`${props.banner.src}`} alt=""/>
            </div>
          </Flex>
          <Flex>
            <Heading style={{margin: 0}} level={4} lineHeight='24px' weight={500}>{props.title}</Heading>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  enter() {
    // this.setState({expanded: true});
  }

  leave() {
    // this.setState({expanded: false});
  }
}

ColorCard.defaultProps = {
  flex: '1 1 auto',
  alignSelf: 'stretch',
  fill: 'transparent'
};

export default responsive(ColorCard);
