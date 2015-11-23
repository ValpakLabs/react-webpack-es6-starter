import React from 'react';
import {findDOMNode} from 'react-dom';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import Icon from './Icon';

class SelectableList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItems() {
    const styles = {
      item: {
        listStyle: 'none',
        padding: '12px 16px',
        backgroundColor: colors.white,
        borderTop: `1px solid ${colors.grey300}`,
        margin: 0,
        fontSize: 16,
        cursor: 'pointer'
      }
    };
    return this.props.items.map((item, index) => {
      let itemStyle = {...styles.item};
      if (this.props.selectedIndex === index)
        itemStyle = {...itemStyle,
          backgroundColor: this.props.selectedColor
        };
      return (
        <li
          style={itemStyle}
          key={index}
          onClick={e => this.handleItemSelected(index, item.value)}>
          {item.label}
        </li>
      );
    });
  }

  render() {
    const listStyle = {
      padding: 0,
      margin: 0
    };

    return (
      <ul ref="items" style={listStyle}>
        {this.renderItems()}
      </ul>
    );
  }

  handleItemSelected(index, value) {
    this.props.onItemSelected(index, value);
  }

}

SelectableList.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  selectedIndex: React.PropTypes.number,
  selectedColor: React.PropTypes.string,
  onItemSelected: React.PropTypes.func
};

SelectableList.defaultProps = {
  items: [],
  selectedIndex: -1,
  selectedColor: Color(brand.secondary).mix(Color(colors.white), 0.2).rgbString(),
  onItemSelected: e => null
};

export default SelectableList;
