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
    const {zones, zones: {collections=[]}} = page;
    const {viewportSize} = this.props;
    const narrow = (viewportSize === 'xs' || viewportSize === 'sm');

    const styles = {
      feature: {
        padding: narrow ? '20px 0' : '40px 0 60px 0',
        background: colors.white,
        borderBottom: `1px solid ${colors.grey300}`
      },
      featureHeading: {
        textAlign: 'center',
        lineHeight: narrow ? '24px' : '48px',
        margin: '0 0 20px 0',
        color: colors.black
      }
    };

    return (
      <BasePage
        user={this.props.user}
        viewportSize={viewportSize}>

        {!Array.isArray(collections) &&
          <Flex flex={1} align='center' justify='center' direction='column' style={{margin: narrow ? 20 : 60}}>
            <Icon name='watch_later' size={120} fill={colors.red500}/>
            <div style={{marginTop: 24, fontSize: narrow ? 18 : 24, lineHeight: narrow ? '24px' : '36px', textAlign: 'center'}}>
              We're having trouble loading coupons right now. <br/>Please check back in a minute or two!
            </div>
          </Flex>
        }

        {collections[0] &&
          <Flex style={styles.feature}>
            <Container>
              <Heading
                level={narrow ? 3 : 1}
                weight={500}
                style={styles.featureHeading}>
                {zones.primaryHeading.value.text}
              </Heading>
              <Collection
                viewportSize={viewportSize}
                layout={{lg: 'xtallboy', md: 'xtallboy'}}
                items={collections[0].items.slice(0, 3)}/>
            </Container>
          </Flex>
        }

        {collections[1] &&
          <div style={{padding: '40px 0', marginBottom: 20}}>
            <Container>
              <Collection
                viewportSize={viewportSize}
                layout={{
                  lg: collections[1].layout,
                  md: collections[1].layout
                }}
                title={collections[1].title}
                url={collections[1].url}
                items={collections[1].items}/>
            </Container>
          </div>
        }

        {collections[2] &&
          <div style={{
              background: brand.altSecondary,
              padding: '24px 0 30px 0'
            }}>
            <Container>
              <Flex
                style={{color: colors.white}}
                direction='column'
                align='center'
                justify='center'>
                <Heading
                  pushEnds={1.5}
                  weight={narrow ? 500 : 300}
                  level={narrow ? 3 : 2}
                  style={{marginBottom: 24}}>
                  {collections[2].title}
                </Heading>
                <Collection
                  items={collections[2].items}
                  viewportSize={viewportSize}
                  layout={{
                    lg: collections[2].layout,
                    md: collections[2].layout,
                    sm: 'shotglass2',
                    xs: 'shotglass2'
                  }}/>
                {collections[2].url &&
                  <Flex
                    alignSelf='stretch'
                    justify='center'
                    style={{margin: '20px 20px 0 20px'}}>
                    <Button
                      display={narrow ? 'block' : 'inline-block'}
                      justify='center' iconRight={true}
                      icon='arrow_forward'
                      color={colors.white}
                      fill={Color(colors.white).alpha(0.1).rgbaString()}>
                      {collections[2].buttonLabel}
                    </Button>
                  </Flex>}
              </Flex>
            </Container>
          </div>
        }

        {collections[3] &&
          <div style={{padding: '40px 0', marginBottom: 20}}>
            <Container>
              <Collection
                viewportSize={viewportSize}
                layout={{
                  lg: collections[3].layout,
                  md: collections[3].layout
                }}
                title={collections[3].title}
                url={collections[3].url}
                items={collections[3].items}
              />
            </Container>
          </div>
        }

        <MemberEmailHero viewportSize={viewportSize}/>

        <div style={{background: Color(brand.tertiary).lighten(0.1).rgbaString(), height: 400}}>

        </div>

      </BasePage>
    );
  }
}

export default BFPThomepage;
