import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import colors, {brand} from '../theme/colors';
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
    const {label, buttonProps, openButtonProps, dropdownStyles} = this.props;

    const styles = {
      wrapper: {
        position: 'relative',
        ...this.props.style
      },
      button: {
        width: this.props.width,
        borderRadius: !this.state.isClosing ? '2px 2px 0 0' : 2,
        boxShadow: !this.state.isClosing ? '0px 5px 8px rgba(0,0,0,0.2)' : 'none',
      },
      dropdown: {
        transform: 'translateY(0)',
        transformOrigin: '0 0',
        display: this.state.isOpen ? 'block' : 'none',
        position: 'absolute',
        width: this.props.width,
        marginTop: 0,
        boxShadow: '0px 5px 8px rgba(0,0,0,0.2)',
        right: 0,
        background: colors.white,
        borderRadius: '0px 0px 2px 2px',
        ...dropdownStyles
      }
    }

    const ddButtonProps = this.state.isClosing ?
      buttonProps :
      {...buttonProps, ...openButtonProps, nohover: true};

    return (
      <div ref='wrapper' style={styles.wrapper}>
        <Button ref='button' justify='space-between' iconRight={true} style={styles.button} {...ddButtonProps} onClick={::this.toggleOpen}>{label}</Button>

        <Motion
          style={{
            scaleY: spring(this.state.isClosing ? 0.5 : 1, [this.state.isClosing ? 400 : 680, 32]),
            opacity: spring(this.state.isClosing ? 0.01 : 1, [1200, 35])
          }}>
          {interpolation =>
            <div style={{...styles.dropdown, opacity: interpolation.opacity, transform: `scaleY(${interpolation.scaleY})`}}>
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

Dropdown.defaultProps = {
  nohover: false,
  width: 200,
  buttonProps: {
    color: colors.white,
    fill: brand.primary
  }
}

export default Dropdown;
