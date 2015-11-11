import React, {PropTypes, Component} from 'react';
import {findDOMNode} from 'react-dom';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import responsive from './responsive';
import Flex from './Flex';
import Heading from './Heading';
import Icon from './Icon';

class Listing extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      expanded: false
    }
  }

  componentDidUpdate() {

  }

  render() {
    const {props} = this;

    const styles = {
      backgroundColor: brand[props.backgroundColor],
      backgroundImage: `url(${props.banner || ''})`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      cursor: 'pointer',
      ...props.style
    };

    const innerCardStyles = {
      color: colors.white,
      margin: 0,
      maxWidth: '95%'
    }

    const iconStyles = {
      marginBottom: 8,
      color: colors.white
    };


    return (
      <Flex
        flex={props.flex}
        alignSelf={props.alignSelf}
        direction='column'
        align='center'
        justify='center'
        style={styles}
        onMouseEnter={::this.enter}
        onMouseLeave={::this.leave}>

        <Flex style={iconStyles} align='center' justify='center'>
          <Icon name={props.icon} size={64}/>
        </Flex>

        <Flex style={innerCardStyles}>
          <Flex direction='column' flex={1}>
            <Heading style={{margin: 0}} level={4} lineHeight='24px' weight={400}>{props.title}</Heading>
          </Flex>
        </Flex>

        <div style={{
            transition: 'opacity .2s ease-out',
            opacity: this.state.expanded || props.favorite ? 1 : 0,
            background: colors.white,
            borderRadius: 18,
            padding: 4,
            position: 'absolute',
            top: 8,
            right: 8,
            boxShadow: '1px 1px 1px rgba(0,0,0,0.25)',
            cursor: 'pointer'
          }}>
          <Icon fill={props.favorite ? colors.amber600 : colors.grey700} name={props.favorite ? 'star' : 'star_border'}/>
        </div>
      </Flex>
    );
  }

  enter() {
    this.setState({expanded: true});
  }

  leave() {
    this.setState({expanded: false});
  }
}

Listing.defaultProps = {
  flex: '1 1 auto',
  alignSelf: 'stretch'
};

export default responsive(Listing);
