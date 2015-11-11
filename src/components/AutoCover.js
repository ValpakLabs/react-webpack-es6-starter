import React from 'react';
import cx from 'classnames';
import coverBounds from '../utils/cover-bounds'

class AutoCover extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parentWidth: 0,
      parentHeight: 0
    }
    this.updateChildSize = this.updateChildSize.bind(this);
  }

  componentDidMount() {
    let media = React.findDOMNode(this.refs.media);
    // console.log('loaded: ' + media.complete)
    media.addEventListener('load', this.updateChildSize);
  }

  componentDidUnmount() {
    React.findDOMNode(this.refs.media).removeEventListener('load', this.updateChildSize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let parentBounds = React.findDOMNode(this.refs.content).getBoundingClientRect();
    let parentWidth = parentBounds.width;
    let parentHeight = parentBounds.height;

    return (nextState.parentWidth !== parentWidth ||
            nextState.parentHeight !== parentHeight);
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateChildSize();  
  }

  render() {
    let styles = {
      height: this.props.height || '100%',
      width: this.props.width || '100%',
      overflow: 'hidden'
    }

    let classes = cx('AutoCover', {
      [this.props.className]: true
    });

    return (
      <div className={classes} ref="content" style={styles}>
        {React.cloneElement(this.props.children || <div/>, {ref: 'media'})}
      </div>
    );
  }

  updateChildSize() {
    let parentBounds = React.findDOMNode(this.refs.content).getBoundingClientRect();

    let child = React.findDOMNode(this.refs.media),
        childBounds = child.getBoundingClientRect();

    let w1 = parentBounds.width,
        h1 = parentBounds.height,
        w2 = childBounds.width,
        h2 = childBounds.height;

    let bounds = coverBounds(w1, h1, w2, h2, 'px', this.props.center, this.props.fit);

    child.style.width = bounds.width;
    child.style.height = bounds.height;
    child.style.marginTop = bounds.top;
    child.style.marginLeft = bounds.left;

    this.setState({
      parentWidth: parentBounds.width,
      parentHeight: parentBounds.height
    })
  }

}

AutoCover.propTypes = {
  center: React.PropTypes.bool,
  fit: React.PropTypes.bool
};

AutoCover.defaultProps = {
  center: true,
  fit: false,
  height: 0,
  width: 0
};

export default AutoCover;