import React from 'react';
import cx from 'classnames';
import getGridStyle from '../utils/grid-style-calculator';

class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 480
    }
  }

  componentDidMount() {
    this.setState({
      containerWidth: React.findDOMNode(this).clientWidth
    });
  }

  render() {
    let gridClassNames = cx('Grid', {});

    return (
      <div className={gridClassNames}>
        {this.renderGridItems()}
      </div>
    );
  }

  renderGridItems() {
    return React.Children.map(this.props.children, this.createGridItem.bind(this));
  }

  createGridItem(item, key) {
    let style = getGridStyle({
      itemIndex: key,
      itemCount: React.Children.count(this.props.children),
      columns: this.props.cols,
      gutter: this.props.gutter,
      rowGutter: this.props.rowGutter,
      containerWidth: this.state.containerWidth
    });

    return React.createElement('div', {ref: `col${key}`, style}, item);
  }

}

Grid.defaultProps = {
  cols: 1,
  gutter: 1/12,
  rowGutter: 1/12
}

export default Grid;