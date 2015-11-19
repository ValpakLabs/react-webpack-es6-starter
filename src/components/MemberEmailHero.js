import React from 'react';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import Container from './Container';
import Flex from './Flex';
import Heading from './Heading';
import Icon from './Icon';
import Button from './Button';

class MemberEmailHero extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {viewportSize} = this.props;
    const narrow = (viewportSize === 'xs' || viewportSize === 'sm');

    const styles = {
      base: {
        backgroundColor: brand.primary,
        padding: 0
      },
      innerContainer: {
        padding: narrow ? '30px 0' : '40px 0',
        width: narrow ? 320 : 620
      }
    };

    return (
      <Flex style={styles.base} align='center'>
        <Container style={styles.innerContainer}>
          <Flex align='center' justify='space-between' direction={narrow ? 'column' : 'row'}>

            <div style={{marginBottom: narrow ? 24 : 0}}>
              <Heading style={{textAlign: narrow ? 'center' : 'left', lineHeight: '24px', margin: 0, marginBottom: narrow ? 10 : 0}} level={4} weight={500} color={colors.white}>Exclusive offers, right to your inbox.</Heading>
              <Heading style={{textAlign: narrow ? 'center' : 'left', lineHeight: '36px', margin: 0}} level={2} color={colors.white}>Join the Member Email Club</Heading>
            </div>

            <Flex align='center' alignSelf='stretch'>
              <Button icon='email' justify='center' display='block' color={colors.white} fill={brand.secondary}>Sign Up Today</Button>
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
