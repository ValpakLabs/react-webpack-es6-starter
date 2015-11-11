import React from 'react';
import {findDOMNode} from 'react-dom';
import colors, {brand} from '../theme/colors';
import Container from './Container';
import Flex from './Flex';
import Heading from './Heading';
import Icon from './Icon';

class MemberEmailHero extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      backgroundColor: brand.tertiary,
      padding: 40,
      margin: '40px 0'
    };

    const emailFormWrapperStyles = {
      marginTop: 30
    };

    const emailFormStyles = {
    };

    const emailInputStyles = {
      borderRadius: 3,
      width: 320,
      border: 0,
      padding: '8px 12px',
      fontSize: 16,
      lineHeight: '24px',
      marginRight: 5,
      outline: 'none'
    };

    const submitButtonStyles = {
      border: 0,
      background: brand.altPrimary,
      color: colors.white,
      fontSize: 16,
      lineHeight: '24px',
      padding: '8px 16px',
      borderRadius: 3
    };

    return (
      <Flex style={styles} align='center'>
        <Container>
          <Flex align='center' justify='center' direction='column'>
            <Heading level={2} color={colors.white} textAlign='center'>Want savings like these <br/>delivered right to your inbox?</Heading>

            <Flex style={emailFormWrapperStyles}>
              <form style={emailFormStyles}>
                <input placeholder='just add an email address' style={emailInputStyles} type="text" />
                <button style={submitButtonStyles}>Sign Up</button>
              </form>
            </Flex>

          </Flex>
        </Container>
      </Flex>
    );
  }
}

MemberEmailHero.defaultProps = {

};

export default MemberEmailHero;
