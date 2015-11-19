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
      backgroundColor: colors.grey300,
      backgroundImage: `url(${props.banner.src || ''})`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      cursor: 'pointer',
      ...props.style
    };

    const innerCardStyles = {
      background: colors.white,
      color: colors.black,
      margin: `12px 12px 10px 0px`,
      padding: `12px 16px 12px 10px`,
      borderLeft: `1px solid ${colors.grey200}`,
      boxShadow: `2px 2px 3px rgba(0,0,0,0.2)`,
      maxWidth: '95%'
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
      maxWidth: '100%',
    };

    return (
      <Flex
        flex={props.flex}
        alignSelf={props.alignSelf}
        align='flex-end'
        justify='flex-start'
        style={styles}
        onMouseEnter={::this.enter}
        onMouseLeave={::this.leave}>
        <Flex style={innerCardStyles}>
          {
            props.logoSrc &&
              <div style={innerCardLogoStyles}>
                <img src={props.logoSrc} style={innerCardLogoImageStyles}/>
              </div>
          }
          <Flex>
            <Heading style={{margin: 0}} level={4} lineHeight='24px' weight={500}>{props.title}</Heading>
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
    // this.setState({expanded: true});
  }

  leave() {
    // this.setState({expanded: false});
  }
}

Listing.defaultProps = {
  flex: '1 1 auto',
  alignSelf: 'stretch'
};

export default responsive(Listing);
