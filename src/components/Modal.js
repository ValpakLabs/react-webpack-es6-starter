import React from 'react';
import styles from './styles/modal.style';
import {Motion, spring} from 'react-motion';

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
      }, this.props.closeDelay);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      clearTimeout(this.timeout);
      this.setState({hidden: false});

      let overflowHiddenCount = parseInt(document.body.dataset.hideOverflow) || 0;
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-hide-overflow', overflowHiddenCount + 1);

      setTimeout(() => this.setState({isHiding: false}));
    } else if (prevProps.show && !this.props.show) {
      this.setState({isHiding: true});

      let overflowHiddenCount = parseInt(document.body.dataset.hideOverflow);
      if (!overflowHiddenCount)
        document.body.style.overflow = 'initial';
      document.body.setAttribute('data-hide-overflow', overflowHiddenCount - 1);

      this.timeout = setTimeout(() => {
        this.setState({hidden: true});
      }, this.props.closeDelay);
    }
  }

  render() {
    const containerStyle = Object.assign({}, styles.container, this.props.containerStyle);

    return (
      <Motion
        style={{
          containerOpacity: spring(this.state.isHiding ? 0 : 1, [580, 30]),
          opacity: spring(this.state.isHiding ? 0.01 : 1, [1500, 50]),
          scale: spring(this.state.isHiding ? this.props.scaleBounce : 1, [400, 18])
        }}>
        {interpolation =>
          <div style={{...styles.modal, display: !this.state.hidden ? 'block' : 'none'}}>
            <div style={{...styles.modal, ...this.props.style, opacity: interpolation.opacity}} onClick={::this.hideOnOuterClick}/>
            <div style={{...containerStyle, opacity: interpolation.containerOpacity, transform: `scale(${interpolation.scale})`}}>
              {this.props.children}
            </div>
          </div>
        }
      </Motion>
    );
  }

}

Modal.defaultProps = {
  closeDelay: 200,
  scaleBounce: 0.9
};
