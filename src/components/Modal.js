import React from 'react';
import styles from './styles/modal.style';
import {Motion, spring} from 'react-motion';

export default class Modal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      leaving: true,
      hidden: true
    };
  }

  componentDidMount() {
    if (this.props.show)
      this.show();
  }

  componentWillUnmount() {
    document.body.style.overflow = 'initial';
  }

  handleBackdropClick(event) {
    if (!this.props.closeOnOuterClick || this.state.leaving)
      return;
    this.hide();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show)
      this.show();
    if (prevProps.show && !this.props.show)
      this.hide();
  }

  render() {
    if (this.state.hidden) return null;

    const containerStyle = Object.assign({},
      styles.container,
      this.props.containerStyle
    );

    return (
      <Motion
        ref='motion'
        style={{
          containerOpacity: spring(this.state.leaving ? 0 : 1, [580, 30]),
          opacity: spring(this.state.leaving ? 0.01 : 1, [1500, 50]),
          scale: spring(this.state.leaving ? this.props.scaleBounce : 1, [400, 18]),
          y: spring(this.state.leaving ? this.props.startY : 0, [400, 25])
        }}>
        {interpolation =>
          <div ref='wrapper' style={{...styles.modal, display: !this.state.hidden ? 'block' : 'none'}}>
            <div ref='backdrop' style={{...styles.modal, ...this.props.style, opacity: interpolation.opacity}} onClick={::this.handleBackdropClick}/>
            <div ref='modal' style={{...containerStyle, opacity: interpolation.containerOpacity, transform: `scale(${interpolation.scale}) translateY(${interpolation.y}px)`}}>
              {this.props.children}
            </div>
          </div>
        }
      </Motion>
    );
  }

  show() {
    document.body.style.overflow = 'hidden';
    clearTimeout(this.timeout);
    this.setState({hidden: false});
    setTimeout(() => this.setState({leaving: false}));
  }

  hide() {
    document.body.style.overflow = 'initial';
    this.setState({leaving: true});
    this.timeout = setTimeout(() => {
      this.setState({hidden: true});
      this.props.onClose();
    }, this.props.closeDelay);
  }

}

Modal.defaultProps = {
  show: false,
  closeOnOuterClick: true,
  closeDelay: 200,
  scaleBounce: 0.9,
  startY: -50,
  onClose: e => null
};
