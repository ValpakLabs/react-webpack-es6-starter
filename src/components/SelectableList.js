import React from 'react';
import cx from 'classnames';

class SelectableList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    }
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    console.log('mounting selectable list')
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
    return this.props.items.map((item, index) => {
      let classes = cx('SelectableList__item', {
        'SelectableList__item--active': index === this.state.selectedIndex
      })
      return (
        <li className={classes} key={index} data-index={index} data-value={item.value}>{item.label}</li>
      );
    });
  }
 
  render() {
    let classes = cx('SelectableList', {});

    return (
      <ul className={classes} ref="items" onTouchTap={this.handleItemTapped.bind(this)}>
        {this.renderItems()}
      </ul>
    );
  }

  handleItemTapped(e) {
    let index = parseInt(e.target.getAttribute('data-index'))

    this.setState({selectedIndex: index});
    
    if (typeof this.props.onItemSelected === 'function')
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
  onItemSelected: null,
  onSelectedIndexChange: null
};

export default SelectableList;