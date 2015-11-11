import React from 'react';
import getClasses from 'classnames';

class Circle extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let classes = getClasses('Circle', {
      'Circle--is-starting': this.props.started,
      'Circle--is-ending': this.props.ending
    })

    return (
      <div 
        ref="circle" 
        key={this.props.key} 
        className={classes} 
        style={this.props.style}
      >
      </div>
    );
  }

}

Circle.defaultProps = {

}

export default Circle;