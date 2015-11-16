import React from 'react';
import {findDOMNode} from 'react-dom';
import colors, {brand} from '../theme/colors';
import Flex from './Flex';
import Listing from './Listing';
import CollectionCard from './CollectionCard';
import CollectionListing from './CollectionListing';
import Heading from './Heading';
import Icon from './Icon';
import Button from './Button';

const layouts = {
  goblet: {
    0: [0, 0, 8, 4],
    1: [8, 0, 4, 2],
    2: [8, 2, 4, 2],
    3: [0, 4, 4, 4],
    4: [4, 4, 4, 4],
    5: [8, 4, 4, 4]
  },
  mug: {
    0: [0, 0, 4, 4],
    1: [4, 0, 8, 4],
    2: [0, 4, 4, 2],
    3: [0, 6, 4, 2],
    4: [4, 4, 4, 4],
    5: [8, 4, 4, 4]
  },
  flute: {
    0: [0, 0, 12, 4],
    1: [0, 4, 4, 4],
    2: [4, 4, 4, 4],
    3: [8, 4, 4, 4]
  },
  shot: {
    0: [0, 0, 4, 2],
    1: [4, 0, 4, 2],
    2: [8, 0, 4, 2],
    3: [0, 2, 4, 2],
    4: [4, 2, 4, 2],
    5: [8, 2, 4, 2]
  },
  tallboy: {
    0: [0, 0, 4, 3],
    1: [4, 0, 4, 3],
    2: [8, 0, 4, 3],
    3: [0, 3, 4, 3],
    4: [4, 3, 4, 3],
    5: [8, 3, 4, 3]
  },
  // stack: {
  //   0: [0, 0, 12, 3],
  //   1: [0, 3, 12, 3],
  //   2: [0, 6, 12, 3],
  //   3: [0, 9, 12, 3],
  //   4: [0, 12, 12, 3],
  //   5: [0, 15, 12, 3]
  // }
};

class ListingPak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 320,
      isLoaded: false
    }
    this.updateWidth = this.updateWidth.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (findDOMNode(this).parentNode.clientWidth !== this.state.width)
      this.updateWidth();
  }

  componentDidMount() {
    this.updateWidth();
    this.setState({isLoaded: true});
  }

  updateWidth() {
    let width = findDOMNode(this).parentNode.clientWidth;
    this.setState({width});
  }

  render() {
    let {gutter, rowHeight, title, items, url, viewportSize} = this.props;
    let narrow = viewportSize === 'xs' || viewportSize === 'sm';
    let layout = layouts[this.props.layout];

    items = items.slice(0, Object.keys(layout).length);

    let totalRows = Object.keys(layout).reduce((rows, index) => {
      rows.push(layout[index][1] + layout[index][3]);
      return rows;
    }, []);

    let height = Math.max(...totalRows) * rowHeight;
    let width = this.state.width + gutter;
    let colWidth = width / 12;

    let styles = {
      margin: narrow ? '20px 0' : '30px 0',
      width: '100%'
    };

    let gridStyles = {
      height: narrow ? 'auto' : height,
      width: width,
      margin: `${gutter / -2}px`,
      opacity: this.state.isLoaded ? 1 : 0,
      transition: 'opacity .3s .1s ease-in',
      ...this.props.gridStyles
    };

    return (
      <div style={styles}>
        {title &&
          <Flex justify={narrow ? 'center' : 'space-between'} align='center' style={{marginBottom: narrow ? '1.5em' : '0'}}>
            <Heading
              pushEnds={1.5}
              weight={narrow ? 500 : 300}
              level={narrow ? 3 : 2}>
              {title}
            </Heading>
            {url && !narrow && <Button icon='arrow_forward' iconRight={true} color={colors.white} fill={brand.altSecondary}>See More</Button>}
          </Flex>
        }
        <div style={gridStyles}>
          {items.map((item, index) => {
            if (item.type === 'LOCAL_OFFER') {
              return (
                <Listing
                  key={index}
                  style={this.getItemStyle(index, layout, colWidth, rowHeight, gutter, narrow)}
                  {...item}/>
              );
            }

            if (item.type === 'COLLECTION') {
              return (
                <CollectionListing
                  key={index}
                  style={this.getItemStyle(index, layout, colWidth, rowHeight, gutter, narrow)}
                  {...item}/>
              );
            }
          })}
        </div>

        {url && narrow && <Button style={{marginTop: 24}} display='block' justify='center' iconRight={true} icon='arrow_forward' color={colors.white} fill={brand.altSecondary}>See More</Button>}
      </div>
    );
  }

  getItemStyle(index, layout, colWidth, rowHeight, gutter, narrow) {
    return {
      backgroundColor: colors.grey300,
      margin: narrow ? `${gutter / 2}px 0 ${gutter}px ${gutter / 2}px` : 0,
      height: narrow ? rowHeight * 3 - gutter : rowHeight * layout[index][3] - gutter,
      width: narrow ? colWidth * 12 - gutter : colWidth * layout[index][2] - gutter,
      position: narrow ? 'relative' : 'absolute',
      transform: narrow ? 'none' : `translate(${colWidth * layout[index][0] + (gutter / 2)}px, ${rowHeight * layout[index][1] + (gutter / 2)}px)`
    };
  }
}

ListingPak.defaultProps = {
  rowHeight: 84,
  gutter: 12,
  layout: 'goblet',
  gridStyles: {},
  title: null
};

ListingPak.contextTypes = {
  viewportSize: React.PropTypes.string.isRequired
};

export default ListingPak;
