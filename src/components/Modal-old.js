import React from 'react';
import styles from './styles/modal.style';
import {Spring} from 'react-motion';

export default class Modal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isHiding: true,
      hidden: true
    };
  }

  componentDidMount() {
    if (this.props.show) {
      this.setState({hidden: false});
      setTimeout(() => this.setState({isHiding: false}));
    }
  }

  hideOnOuterClick(event) {
    if (!this.props.closeOnOuterClick || this.state.isHiding) return;

    if (typeof this.props.onClose === 'function') {
      this.setState({isHiding: true});

      setTimeout(() => {
        this.props.onClose(event);
      }, this.props.closeDelay);

      setTimeout(() => {
        this.setState({hidden: true});
      }, 500);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      clearTimeout(this.timeout);
      this.setState({hidden: false});
      setTimeout(() => this.setState({isHiding: false}));
    } else if (prevProps.show && !this.props.show) {
      this.setState({isHiding: true});
      this.timeout = setTimeout(() => {
        this.setState({hidden: true});
      }, 500);
    }
  }

  render() {
    const containerStyle = Object.assign({}, styles.container, this.props.containerStyle);

    return (
      <Spring
        endValue={{
          size: {
            scaleX: {val: this.state.isHiding ? 0.8 : 1, config: this.state.isHiding ? [400, 40] : [300, 20]},
            scaleY: {val: this.state.isHiding ? 0.4 : 1, config: this.state.isHiding ? [130, 20] : [600, 30]}
          },
          containerOpacity: {val: this.state.isHiding ? 0 : 1, config: this.state.isHiding ? [580, 30] : [210, 20]},
          opacity: {val: this.state.isHiding ? 0.01 : 0.9, config: this.state.isHiding ? [200, 20] : [1500, 50]}
        }}>
        {interpolation =>
          <div style={{...styles.modal, display: !this.state.hidden ? 'block' : 'none'}}>
            <div style={{...styles.modal, ...this.props.style, opacity: interpolation.opacity.val}} onClick={::this.hideOnOuterClick}/>
            <div style={{...containerStyle, opacity: interpolation.containerOpacity.val, transform: `scale(${interpolation.size.scaleX.val}, ${interpolation.size.scaleY.val})`}}>
              {this.props.children}
            </div>
          </div>
        }
      </Spring>
    );
  }

}

Modal.defaultProps = {
  closeDelay: 500
};
