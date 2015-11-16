import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import { getFlyoutStyles } from './positioner';
import Triangle from './Triangle';
import {Motion, spring} from 'react-motion';

class Flyout extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClickAway = this.handleClickAway.bind(this);
    this.state = {
      active: false,
      isHiding: true
    };
  }

  handleClickAway(e) {
    var parent = ReactDOM.findDOMNode(this.refs.parent);
    var triggerEl = document.getElementById(this.props.target);
    if (this.props.closeOnClick) {
      setTimeout(() => this.hide());
      return;
    }
    if (e.target == triggerEl || parent == e.target)
      return;
    if (!this.isDescendant(parent, e.target) && !this.isDescendant(triggerEl, e.target)) {
      this.hide();
    }
  }

  isDescendant(parent, child) {
    var node = child.parentNode;

    while (node != null) {
      if (node == parent) return true;
      node = node.parentNode;
    }

    return false;
  }

  render() {
    if (typeof document === 'undefined')
      return null;
    if (!document.getElementById(this.props.target) || !this.state.active)
      return null;

    let { flyoutPosition, trianglePosition } = getFlyoutStyles(this.props, this.getTargetBounds());

    const styles = {
      base: {
        opacity: 1,
        perspective: 1000,
        transform: 'scale(0)',
        background: this.props.bgcolor,
        borderRadius: 3,
        display: this.state.active ? 'block' : 'none',
        position: 'fixed',
        zIndex: 999,
        boxShadow: '0px 3px 16px rgba(0,0,0, 0.2)'
      },
      inner: {
        width: this.props.width,
        background: this.props.bgcolor,
        padding: this.props.padding,
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2
      }
    };

    return (
      <Motion ref='parent' style={{
        scaleX: {val: this.state.isHiding ? 0 : 1, config: [1200, this.state.isHiding ? 40 : 32]},
        scaleY: {val: this.state.isHiding ? 0 : 1, config: [800, this.state.isHiding ? 40 : 30]},
        opacity: {val: this.state.isHiding ? 0 : 1, config: [1000, 40]}
      }}>
        {interpolation =>
          <div ref='flyout' style={{
            ...styles.base, ...flyoutPosition,
            transform: `scale(${interpolation.scaleX}, ${interpolation.scaleY})`,
            opacity: interpolation.opacity
          }}>
            <Triangle color={this.props.bgcolor} ref='triangle' position={this.props.position} style={trianglePosition}/>
            <div style={styles.inner}>
              {this.props.children}
            </div>
          </div>
        }
      </Motion>
    );
  }

  show() {
    document.addEventListener('click', this.handleClickAway, true);
    clearTimeout(this.timeout);
    this.setState({active: true}, () => {
      this.setState({isHiding: false});
    });
  }

  hide() {
    document.removeEventListener('click', this.handleClickAway, true);
    this.setState({isHiding: true});
    this.timeout = setTimeout(() => {
      if (this.state.active)
        this.setState({active: false});
    }, 500);
  }

  getTargetBounds() {
    var targetEl = document.getElementById(this.props.target);
    if (!targetEl) return;
    var targetElStyles = getComputedStyle(targetEl)
    var targetElBounds = targetEl.getBoundingClientRect()
    targetElBounds.top - targetElStyles.marginTop;
    targetElBounds.left - targetElStyles.marginLeft;
    targetElBounds.left - targetElStyles.marginBottom;
    targetElBounds.left - targetElStyles.marginLeft;
    return targetElBounds;
  }
}

Flyout.defaultProps = {
  bgcolor: '#FFF',
  closeOnClick: false,
  padding: 20,
  open: false,
  target: null,
  offset: 6,
  width: 300,
  position: 'below',
  triangleWidth: 10,
  triangleHeight: 10,
  onClickAway: null,
  closeDelay: 300
};

export default Flyout;
