import React from 'react';

class Icon extends React.Component {
  static defaultProps = {
    size: 24,
    fill: 'inherit',
    name: '',
    pushRight: 0,
    pushLeft: 0,
    hide: false
  }

  render() {
    const {size, fill, name, pushRight, pushLeft, hide} = this.props;

    const style = {
      display: hide ? 'none' : 'inherit',
      fontSize: size,
      color: fill,
      marginRight: pushRight,
      marginLeft: pushLeft
    };

    return (
      <i className='material-icons' style={{...style, ...this.props.style}}>{name}</i>
    );
  }

}

export default Icon;
