import React, { Component, PropTypes } from 'react';
import colors from '../theme/colors';
import responsive from './responsive';
import Container from './Container';
import BrandHeader from './BrandHeader';
import FeatureBillboard from './FeatureBillboard';
import VideoBillboard from './VideoBillboard';
import FeaturedCategoryBar from './FeaturedCategoryBar';
import MemberEmailHero from './MemberEmailHero';
import Flex from './Flex';
import Heading from './Heading';
import ListingPak from './ListingPak';
import Listing from './Listing';
import Icon from './Icon';

class BTmpl_homepage extends Component {
  render() {
    const page = this.props.page.toJS();
    const user = this.props.user.toJS();
    const {zones} = page;
    const collections = zones.collections || [];
    const {viewportSize} = this.props;
    const isNarrow = (viewportSize === 'xs' || viewportSize === 'sm');

    return (
      <div>
        <BrandHeader />

        {/*viewportSize === 'lg' ?
          <VideoBillboard /> :
          <FeatureBillboard />*/}

        <FeatureBillboard />

        {!isNarrow && <FeaturedCategoryBar geo={user.geo}/>}


          <Container>
            {collections.length > 0 &&
              <Flex>
                <ListingPak
                  viewportSize={viewportSize}
                  layout={page.zones.collections[0].layout}
                  title={page.zones.collections[0].title}
                  url={page.zones.collections[0].url}
                  items={page.zones.collections[0].items}
                />
              </Flex>}
            {collections.length > 1 &&
              <Flex>
                <ListingPak
                  viewportSize={viewportSize}
                  layout={page.zones.collections[1].layout}
                  title={page.zones.collections[1].title}
                  url={page.zones.collections[1].url}
                  items={page.zones.collections[1].items}
                />
              </Flex>}
          </Container>


        <MemberEmailHero />
      </div>
    );
  }
}

export default BTmpl_homepage;
