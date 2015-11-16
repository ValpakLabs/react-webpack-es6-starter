import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import colors from '../theme/colors';
import Button from './Button';
import {Motion, spring} from 'react-motion';

class Dropdown extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false,
      isClosing: true
    };
    this.handleClickAway = this.handleClickAway.bind(this);
  }

  render() {
    const {label, buttonProps, dropdownStyles} = this.props;

    const styles = {
      wrapper: {
        position: 'relative',
        ...this.props.style
      },
      button: {

      },
      dropdown: {
        transform: 'translateY(0)',
        display: this.state.isOpen ? 'block' : 'none',
        position: 'absolute',
        width: 220,
        marginTop: 2,
        right: 0,
        background: colors.white,
        borderRadius: 2,
        ...dropdownStyles
      }
    }

    return (
      <div ref='wrapper' style={styles.wrapper}>
        <Button ref='button' iconRight={true} {...buttonProps} onClick={::this.toggleOpen}>{label}</Button>

        <Motion
          style={{
            y: spring(this.state.isClosing ? -20 : 0, [680, 30]),
            opacity: spring(this.state.isClosing ? 0 : 1, [800, 35])
          }}>
          {interpolation =>
            <div style={{...styles.dropdown, opacity: interpolation.opacity, transform: `translateY(${interpolation.y}px)`}}>
              {this.props.children}
            </div>
          }
        </Motion>
      </div>
    );
  }

  toggleOpen() {
    this[this.state.isOpen ? 'hide' : 'show']();
  }

  show() {
    document.addEventListener('click', this.handleClickAway, true);
    clearTimeout(this.timeout);
    this.setState({isOpen: true}, () => {
      this.setState({isClosing: false});
    });
  }

  hide() {
    document.removeEventListener('click', this.handleClickAway, true);
    this.setState({isClosing: true});
    this.timeout = setTimeout(() => {
      this.setState({isOpen: false});
    }, 200);
  }

  handleClickAway(e) {
    var wrapper = this.refs.wrapper;
    var button = findDOMNode(this.refs.button);
    if (this.props.closeOnClick) {
      setTimeout(() => this.hide());
      return;
    }
    if (e.target == button || wrapper == e.target)
      return;
    if (!this.isDescendant(wrapper, e.target) && !this.isDescendant(button, e.target)) {
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

}

export default Dropdown;
