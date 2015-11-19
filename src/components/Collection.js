import React from 'react';
import {findDOMNode} from 'react-dom';
import colors, {brand} from '../theme/colors';
import Flex from './Flex';
import Listing from './Listing';
import CollectionListing from './CollectionListing';
import ColorCard from './ColorCard';
import Heading from './Heading';
import Icon from './Icon';
import Grid from './Grid';
import Button from './Button';

class Collection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {layout, title, buttonLabel, items, url, viewportSize} = this.props;
    let narrow = viewportSize === 'xs' || viewportSize === 'sm';

    let styles = {
      width: '100%',
      ...this.props.style
    };

    return (
      <div style={styles}>

        {title &&
          <Flex justify={narrow ? 'center' : 'space-between'} align='center' style={{marginBottom: narrow ? '1em' : '0'}}>
            <Heading
              pushEnds={1.5}
              weight={narrow ? 500 : 300}
              level={narrow ? 3 : 2}>
              {title}
            </Heading>
            {url && !narrow && <Button icon='arrow_forward' iconRight={true} color={colors.white} fill={brand.tertiary}>{buttonLabel}</Button>}
          </Flex>
        }

        <Grid
          layout={layout}
          viewportSize={viewportSize}
          {...this.props.gridProps}>

          {items.map((item, index) => {
            if (item.type === 'LOCAL_OFFER' || item.type === 'NATL_OFFER')
              return <Listing key={index} {...item}/>
            if (item.type === 'COLLECTION')
              return <CollectionListing key={index} {...item}/>
            if (item.type === 'COLOR_CARD')
              return <ColorCard key={index} {...item}/>
          })}

        </Grid>

        {url && narrow && <Button style={{marginTop: 24}} display='block' justify='center' iconRight={true} icon='arrow_forward' color={colors.white} fill={brand.tertiary}>{buttonLabel}</Button>}

      </div>
    );
  }
}

Collection.defaultProps = {
  gridProps: {},
  title: null,
  layout: {},
  buttonLabel: 'See More'
};

export default Collection;
