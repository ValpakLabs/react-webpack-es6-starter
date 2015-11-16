import React from 'react';

class Triangle extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      position: 'absolute',
      zIndex: 1,
      filter: 'drop-shadow(0px 0px 4px rgba(#000, 0.1))',
      borderStyle: 'solid',
      borderColor: 'transparent',
      width: 10,
      height: 10,
      borderWidth: 10,

      borderBottomColor: this.props.position === 'below' ? this.props.color : 'transparent',
      borderTopColor: this.props.position === 'above' ? this.props.color : 'transparent',
      borderLeftColor: this.props.position === 'left' ? this.props.color : 'transparent',
      borderRightColor: this.props.position === 'right'  ? this.props.color : 'transparent',

      borderBottomWidth: this.props.position === 'above' ? 0 : 10,
      borderTopWidth: this.props.position === 'below' ? 0 : 10,
      borderLeftWidth: this.props.position === 'right' ? 0 : 10,
      borderRightWidth: this.props.position === 'left'  ? 0 : 10
    };

    return (
      <div style={{...styles, ...this.props.style}}></div>
    );
  }

}

Triangle.defaultProps = {
  color: '#FFF'
};

export default Triangle;
