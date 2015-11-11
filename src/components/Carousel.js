import React from 'react';
import ReactSwipe from 'react-swipe';

class Carousel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactSwipe auto={this.props.auto} continuous={false}>
        {this.props.children}
      </ReactSwipe>
    );
  }

}

export default Carousel;