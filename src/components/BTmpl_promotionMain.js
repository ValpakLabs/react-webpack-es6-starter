import React, {Component, PropTypes} from 'react';
import responsive from './responsive';
import colors from '../theme/colors';
import BrandHeader from './BrandHeader';
import Flex from './Flex';
import Heading from './Heading';
import ListingPak from './ListingPak';
import Listing from './Listing';
import Icon from './Icon';
import Container from './Container';

class BTmpl_default extends Component {

  render() {
    const page = this.props.page.toJS();
    const {viewportSize} = this.props;
    const primaryBillboardImage = page.zones.billboardPrimary.value.image;

    const styles = {
      base: {
        padding: '20px 0',
        backgroundColor: page.customFields.pageBackgroundColor.value
      },
      primaryHeaderBar: {
        backgroundColor: page.customFields.pageAccentColor.value,
        color: colors.white,
        height: 60,
        padding: '0 20px',
        borderRadius: '3px 3px 0 0'
      },
      primaryContentBody: {
        backgroundColor: colors.white,
        minHeight: 1000,
        marginBottom: 40
      }
    };

    return (
      <div>
        <BrandHeader />

        <div style={styles.base}>
          <Flex style={{height: primaryBillboardImage.fullsize.height, marginTop: 0}} align='center' justify='center'>
            <img style={{display: 'block', maxHeight: '100%', width: 'auto'}} src={`http://localhost:7640/balefire-valpak/${primaryBillboardImage.fullsize.path}`} alt={primaryBillboardImage.altText} />
          </Flex>

          <Container>
            <Flex align='center' style={styles.primaryHeaderBar}>
              <Heading level={4}>{page.zones.primaryHeading.value.text}</Heading>
            </Flex>
            <div style={styles.primaryContentBody}>
              main body
            </div>
          </Container>
        </div>

      </div>
    );
  }

}

BTmpl_default.defaultProps = {
  page: {}
};

export default responsive(BTmpl_default);
