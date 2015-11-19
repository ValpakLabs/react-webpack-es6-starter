import React from 'react';
import {findDOMNode} from 'react-dom';
import colors, {brand} from '../theme/colors';
import Flex from './Flex';
import Listing from './Listing';
import CollectionListing from './CollectionListing';
import ColorCard from './ColorCard';
import Heading from './Heading';
import Icon from './Icon';
import Button from './Button';

const layouts = {
  goblet: [
    [0, 0, 8, 4],
    [8, 0, 4, 2],
    [8, 2, 4, 2],
    [0, 4, 4, 4],
    [4, 4, 4, 4],
    [8, 4, 4, 4]
  ],
  mug: [
    [0, 0, 4, 4],
    [4, 0, 8, 4],
    [0, 4, 4, 2],
    [0, 6, 4, 2],
    [4, 4, 4, 4],
    [8, 4, 4, 4]
  ],
  flute: [
    [0, 0, 12, 4],
    [0, 4, 4, 4],
    [4, 4, 4, 4],
    [8, 4, 4, 4]
  ],
  shot: [
    [0, 0, 4, 2],
    [4, 0, 4, 2],
    [8, 0, 4, 2],
    [0, 2, 4, 2],
    [4, 2, 4, 2],
    [8, 2, 4, 2]
  ],
  tallboy: [
    [0, 0, 4, 3],
    [4, 0, 4, 3],
    [8, 0, 4, 3],
    [0, 3, 4, 3],
    [4, 3, 4, 3],
    [8, 3, 4, 3]
  ],
  xtallboy: [
    [0, 0, 4, 4],
    [4, 0, 4, 4],
    [8, 0, 4, 4],
    [0, 4, 4, 4],
    [4, 4, 4, 4],
    [8, 4, 4, 4]
  ],
  shotglass2: [
    [0, 0, 6, 2],
    [6, 0, 6, 2],
    [0, 2, 6, 2],
    [6, 2, 6, 2],
    [0, 4, 6, 2],
    [6, 4, 6, 2]
  ],
  shotglass5: [
    [0, 0, 2.4, 2],
    [2.4, 0, 2.4, 2],
    [4.8, 0, 2.4, 2],
    [7.2, 0, 2.4, 2],
    [9.6, 0, 2.4, 2]
  ],
  shotglass6: [
    [0, 0, 2, 2],
    [2, 0, 2, 2],
    [4, 0, 2, 2],
    [6, 0, 2, 2],
    [8, 0, 2, 2],
    [10, 0, 2, 2]
  ]
};

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      isLoaded: false
    }
    this.updateWidth = this.updateWidth.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.refs.wrapper && this.refs.wrapper.clientWidth || this.props.width) !== this.state.width)
      this.updateWidth();
  }

  componentDidMount() {
    this.updateWidth();
    this.setState({isLoaded: true});
  }

  updateWidth() {
    let width = this.refs.wrapper && this.refs.wrapper.clientWidth || this.props.width;
    this.setState({width});
  }

  render() {
    let {gutter, rowHeight, title, buttonLabel, items, url, viewportSize} = this.props;
    let narrow = viewportSize === 'xs' || viewportSize === 'sm';
    let layoutProps = {...Grid.defaultProps.layout, ...this.props.layout};

    let layout = 'stack';

    if (typeof this.props.layout[viewportSize] === 'string')
      layout = layouts[this.props.layout[viewportSize]] || 'stack';
    else if (Array.isArray(this.props.layout[viewportSize]))
      layout = this.props.layout[viewportSize];

    let childCount = this.props.children.length
    let children = this.props.children;

    if (childCount >= Object.keys(layout).length && layout !== 'stack')
      children = this.props.children.slice(0, Object.keys(layout).length);

    let totalRows = Object.keys(layout).reduce((rows, index) => {
      if (index >= childCount - 1) return rows;
      rows.push(layout[index][1] + layout[index][3]);
      return rows;
    }, []);

    let height = Math.max(...totalRows) * rowHeight;
    let width = this.state.width + gutter;
    let colWidth = width / 12;

    let styles = {
      width: '100%',
      ...this.props.style
    };

    let gridStyles = {
      height: layout === 'stack' ? 'auto' : height,
      width: width,
      margin: `${gutter / -2}px`,
      opacity: this.state.isLoaded ? 1 : 0,
      transition: 'opacity .3s .1s ease-in',
      ...this.props.gridStyles
    };

    return (
      <div style={styles} ref='wrapper'>

        <div style={gridStyles}>
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              ref: `grid_item_${index}`,
              key: index,
              style: this.getItemStyle(index, layout, colWidth, rowHeight, gutter, narrow)
            });
          })}
        </div>

      </div>
    );
  }

  getItemStyle(index, layout, colWidth, rowHeight, gutter, narrow, stacked) {
    return {
      margin: layout === 'stack' ? `${gutter / 2}px 0 ${gutter}px ${gutter / 2}px` : 0,
      height: layout === 'stack' ? rowHeight * 3 - gutter : rowHeight * layout[index][3] - gutter,
      width: Math.round(layout === 'stack' ? colWidth * 12 - gutter : colWidth * layout[index][2] - gutter),
      position: layout === 'stack' ? 'relative' : 'absolute',
      transform: layout === 'stack' ? 'none' : `translate(${colWidth * layout[index][0] + (gutter / 2)}px, ${rowHeight * layout[index][1] + (gutter / 2)}px)`
    };
  }
}

Grid.defaultProps = {
  width: 320,
  rowHeight: 84,
  gutter: 2,
  layout: {
    xs: 'stack',
    sm: 'stack',
    md: 'goblet',
    lg: 'goblet',
  },
  gridStyles: {},
  viewportSize: 'xs'
};

export default Grid;
