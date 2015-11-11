import React from 'react';
import {findDOMNode} from 'react-dom';
import colors, {brand} from '../theme/colors';
import Flex from './Flex';
import Listing from './Listing';
import CollectionCard from './CollectionCard';
import CollectionListing from './CollectionListing';
import Heading from './Heading';
import Icon from './Icon';

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

  componentDidMount() {
    window.addEventListener('resize', this.updateWidth);
    this.updateWidth();
    this.setState({isLoaded: true});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  updateWidth() {
    this.setState({
      width: findDOMNode(this).parentNode.clientWidth
    });
  }

  render() {
    let {gutter, rowHeight, title, items, url} = this.props;
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
      margin: '30px 0'
    };

    let gridStyles = {
      height: height,
      width: width,
      margin: `${gutter / -2}px`,
      opacity: this.state.isLoaded ? 1 : 0,
      transition: 'opacity .3s .1s ease-in',
      ...this.props.gridStyles
    };

    return (
      <div style={styles}>
        {title &&
          <Flex justify='space-between' align='center'>
            <Heading pushEnds={1.5} level={2}>{title}</Heading>
            {url && <Flex align='center' style={{borderRadius: 3, padding: '6px 8px 6px 12px', background: brand.altSecondary, fontSize: 14, color: colors.white}}>See More <Icon name='arrow_forward' pushLeft={8} size={18}/></Flex>}
          </Flex>
        }
        <div style={gridStyles}>
          {items.map((item, index) => {
            if (item.itemType === 'listing') {
              return (
                <Listing
                  key={index}
                  style={{
                    backgroundColor: colors.grey300,
                    height: rowHeight * layout[index][3] - gutter,
                    width: colWidth * layout[index][2] - gutter,
                    position: 'absolute',
                    transform: `translate(${colWidth * layout[index][0] + (gutter / 2)}px, ${rowHeight * layout[index][1] + (gutter / 2)}px)`
                  }}
                  {...item}/>
              );
            }

            if (item.itemType === 'collection') {
              return (
                <CollectionListing
                  key={index}
                  style={{
                    backgroundColor: colors.grey300,
                    height: rowHeight * layout[index][3] - gutter,
                    width: colWidth * layout[index][2] - gutter,
                    position: 'absolute',
                    transform: `translate(${colWidth * layout[index][0] + (gutter / 2)}px, ${rowHeight * layout[index][1] + (gutter / 2)}px)`
                  }}
                  {...item}/>
              );
            }
          })}
        </div>
      </div>
    );
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
