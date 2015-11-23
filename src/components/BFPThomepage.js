import React, { Component, PropTypes } from 'react';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import BasePage from './BasePage';
import Container from './Container';
import BrandHeader from './BrandHeader';
import FeatureBillboard from './FeatureBillboard';
import VideoBillboard from './VideoBillboard';
import FeaturedCategoryBar from './FeaturedCategoryBar';
import MemberEmailHero from './MemberEmailHero';
import Flex from './Flex';
import Heading from './Heading';
import Collection from './Collection';
import Icon from './Icon';
import Button from './Button';

class BFPThomepage extends Component {
  render() {
    const page = this.props.page.toJS();
    const user = this.props.user.toJS();
    const {zones} = page;
    const collections = zones.collections || [];
    const {viewportSize} = this.props;
    const isNarrow = (viewportSize === 'xs' || viewportSize === 'sm');

    return (
      <BasePage user={this.props.user} viewportSize={viewportSize}>

        <FeatureBillboard style={{marginBottom: 20, padding: isNarrow ? '20px 0' : '40px 0 60px 0', background: colors.white, borderBottom: `1px solid ${colors.grey300}`, }}>
          <Container>
            <div>
              <Heading
                level={isNarrow ? 3 : 1}
                weight={500}
                style={{textAlign: 'center', lineHeight: isNarrow ? '24px' : '48px', margin: '0 0 20px 0', color: colors.black}}>
                {page.zones.primaryHeading.value.text}
              </Heading>
            </div>
            <Collection
              viewportSize={viewportSize}
              layout={{
                lg: 'xtallboy',
                md: 'xtallboy'
              }}
              items={page.zones.collections[0].items.slice(0, 3)}
            />
          </Container>
        </FeatureBillboard>

        <Container style={{marginBottom: 60}}>
          {collections.length > 1 &&
            <Collection
              viewportSize={viewportSize}
              layout={{
                lg: page.zones.collections[1].layout,
                md: page.zones.collections[1].layout
              }}
              title={page.zones.collections[1].title}
              url={page.zones.collections[1].url}
              items={page.zones.collections[1].items}
            />}
        </Container>

        <div style={{background: brand.altSecondary, padding: '10px 0 30px 0', marginBottom: 20}}>
          <Container style={{}}>
            {collections.length > 2 &&
              <Flex style={{color: colors.white}} direction='column' align='center' justify='center'>

                <Flex justify={isNarrow ? 'center' : 'space-between'} align='center' style={{marginBottom: isNarrow ? '1em' : '0'}}>
                  <Heading
                    pushEnds={1.5}
                    weight={isNarrow ? 500 : 300}
                    level={isNarrow ? 3 : 2}>
                    {page.zones.collections[2].title}
                  </Heading>
                </Flex>
                <Collection
                  viewportSize={viewportSize}
                  layout={{
                    lg: page.zones.collections[2].layout,
                    md: page.zones.collections[2].layout,
                    sm: 'shotglass2',
                    xs: 'shotglass2'
                  }}
                  gutter={2}
                  items={page.zones.collections[2].items}/>
                {page.zones.collections[2].url &&
                  <Flex alignSelf='stretch' justify='center' style={{margin: '20px 20px 0 20px'}}>
                    <Button display={isNarrow ? 'block' : 'inline-block'} justify='center' iconRight={true} icon='arrow_forward' color={colors.white} fill={Color(colors.white).alpha(0.1).rgbaString()}>{page.zones.collections[2].buttonLabel}</Button>
                  </Flex>}
              </Flex>}
          </Container>
        </div>

        <Container style={{marginBottom: 60}}>
          {collections.length > 3 &&
            <Collection
              viewportSize={viewportSize}
              layout={{
                lg: page.zones.collections[3].layout,
                md: page.zones.collections[3].layout
              }}
              title={page.zones.collections[3].title}
              url={page.zones.collections[3].url}
              items={page.zones.collections[3].items}
            />}
        </Container>

        <MemberEmailHero viewportSize={viewportSize}/>

        <div style={{background: Color(brand.tertiary).lighten(0.1).rgbaString(), height: 400}}>

        </div>

      </BasePage>
    );
  }
}

export default BFPThomepage;
