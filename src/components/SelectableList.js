import React from 'react';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import Icon from './Icon';

class SelectableList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    }
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keyup', this.handleKeyUp, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.handleKeyUp, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.items !== this.props.items)
      this.setState({selectedIndex: -1})
  }

  renderItems() {
    const styles = {
      item: {
        listStyle: 'none',
        padding: '12px 16px',
        background: colors.white,
        borderTop: `1px solid ${colors.grey300}`,
        margin: 0,
        fontSize: 16,
        cursor: 'pointer'
      }
    };

    return this.props.items.map((item, index) => {
      let itemStyle = {...styles.item};
      if (this.state.selectedIndex === index)
        itemStyle = {...itemStyle,
          background: Color(brand.secondary).alpha(0.15).rgbaString()
        };
      return (
        <li
          style={itemStyle}
          key={index}
          data-index={index}
          data-value={item.value}
          onClick={e=> this.handleItemSelected(index)}>
          {item.label}
        </li>
      );
    });
  }

  render() {
    const listStyle = {
      padding: 0,
      margin: 0,
      // borderTop: `1px solid ${colors.grey300}`
    };

    return (
      <ul ref="items" style={listStyle}>
        {this.renderItems()}
      </ul>
    );
  }

  handleItemSelected(index) {
    this.setState({selectedIndex: index});
    this.props.onItemSelected(index);
  }

  handleKeyUp(e) {
    e.stopPropagation();
    let index = this.state.selectedIndex;
    let prevIndex = index;

    if (e.keyCode === 38 && index > 0)
      index--;
    else if (e.keyCode === 40 && index < this.props.items.length)
      index++;

    if (prevIndex !== index) {
      this.setState({selectedIndex: index});
      this.handleSelectedIndexChange(prevIndex, index);
    }
  }

  handleSelectedIndexChange(prevIndex, index) {
    if (typeof this.props.onSelectedIndexChange === 'function') {
      this.props.onSelectedIndexChange(prevIndex, index);
    }
  }

}

SelectableList.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  selectedIndex: React.PropTypes.number,
  onItemSelected: React.PropTypes.func,
  onSelectedIndexChange: React.PropTypes.func
};

SelectableList.defaultProps = {
  items: [],
  selectedIndex: 0,
  onItemSelected: e => null,
  onSelectedIndexChange: e => null
};

export default SelectableList;
