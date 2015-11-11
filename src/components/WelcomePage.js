import React, { Component, PropTypes } from 'react';
import colors from '../theme/colors';
import responsive from './responsive';
import Container from './Container';
import BrandLogo from './BrandLogo';
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

class WelcomePage extends React.Component {
  render() {
    const {viewportSize} = this.context;
    const isNarrow = (viewportSize === 'xs' || viewportSize === 'sm');

    return (
      <div>
        <BrandHeader />

        {/*viewportSize === 'lg' ?
          <VideoBillboard /> :
          <FeatureBillboard />*/}

        <FeatureBillboard />

        {!isNarrow && <FeaturedCategoryBar />}

        {isNarrow ?
          <Container>
            <Flex direction='column' align='stretch' style={{padding: '20px 0'}}>
              <Heading level={3}>Top Offers</Heading>
              {[for (i of Array(12).keys()) (
                <Flex key={i} style={{height: 200, marginBottom: 10}}><Listing /></Flex>
              )]}
            </Flex>
          </Container>
          : (
          <Container>
            <Flex>
              <ListingPak
                layout='goblet'
                title='Popular Offers Near You'
                url='/pak/popular-local'
                items={[
                  {
                    itemType: 'listing',
                    title: 'Half-Off Oil Change and Lube',
                    businessName: 'Big O Tires',
                    logoSrc: 'https://www.valpak.com/img/print/Big-O-Tires-Service.jpg',
                    banner: '/img/Oil-Change-mechanic-Michigan.jpg',
                    favorite: false,
                    listingType: 'In-Store'
                  },
                  {
                    itemType: 'listing',
                    title: 'Buy One Get One Free Sandwich',
                    businessName: 'Subway',
                    logoSrc: 'https://www.valpak.com/img/print/subway-logo-culver-city.JPG',
                    banner: '/img/sub-sandwich.jpg',
                    favorite: false,
                    listingType: 'In-Store'
                  },
                  {
                    itemType: 'listing',
                    title: '30% Off Any Large Pizza',
                    businessName: 'Leonor\'s Restaurant',
                    logoSrc: 'https://www.valpak.com/img/print/BPP_LOGO_58465.jpg',
                    banner: '/img/pizza.jpg',
                    favorite: false,
                    listingType: 'In-Store'
                  },
                  {
                    itemType: 'listing',
                    title: '20% Off Single Item',
                    businessName: 'Spirit Halloween',
                    logoSrc: 'https://d7olld39l2hok.cloudfront.net/logo/2972633.png',
                    banner: '/img/halloween-costumes.jpg',
                    favorite: true,
                    listingType: 'Online'
                  },
                  {
                    itemType: 'listing',
                    title: '2 Free Swimming Lessons',
                    businessName: 'Lenny Krayzelburg Swim',
                    logoSrc: 'https://www.valpak.com/img/print/LennyKrayzelburgLogo.jpg',
                    banner: '/img/swimming.jpeg',
                    favorite: false,
                    listingType: 'In-Store'
                  },
                  {
                    itemType: 'listing',
                    title: '20-50% Off Jewerly Sale',
                    businessName: 'Dillard\'s',
                    logoSrc: 'https://d7olld39l2hok.cloudfront.net/logo/4214858.png',
                    banner: '/img/jewelry.jpg',
                    favorite: false,
                    listingType: 'Online'
                  }
                ]}
              />
            </Flex>
            <Flex>
              <ListingPak
                layout='tallboy'
                title='Staff Collections'
                items={[
                  {
                    itemType: 'collection',
                    title: 'A Night on the Town',
                    banner: '/img/nightout.jpg',
                    collectionUrl: '/pak/something'
                  },
                  {
                    itemType: 'collection',
                    title: 'Top Grocery',
                    banner: '/img/grocerysavings.jpg',
                    collectionUrl: '/pak/something'
                  },
                  {
                    itemType: 'collection',
                    title: 'Halloween Deals',
                    banner: '/img/trickortreat.jpg',
                    collectionUrl: '/pak/something'
                  },
                  {
                    itemType: 'collection',
                    title: 'Game Day',
                    banner: '/img/gameday.jpg',
                    collectionUrl: '/pak/something'
                  },
                  {
                    itemType: 'collection',
                    title: 'Staying Fit',
                    banner: '/img/stayingfit.jpg',
                    collectionUrl: '/pak/something'
                  },
                  {
                    itemType: 'collection',
                    title: 'Family Movie Night',
                    banner: '/img/movienight.jpg',
                    collectionUrl: '/pak/something'
                  },
                ]}
              />
            </Flex>
          </Container>
        )}

        <MemberEmailHero />
      </div>
    );
  }
}

WelcomePage.propTypes = {
  viewportSize: PropTypes.string
}

export default responsive(WelcomePage);
