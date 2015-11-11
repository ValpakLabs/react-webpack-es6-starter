import React from 'react';
import cx from 'classnames';

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpening: false,
      isOpen: false,
      isClosing: false,
      isClosed: true
    };
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show === this.props.show) return;

    if (this.props.show && !this.state.isOpen) {
      this.open()
    } else if (!this.props.show && this.state.isOpen) {
      this.close();
    }
  }

  open() {
    this.setState({isClosed: false})

    setTimeout(() => {
      this.setState({
        isOpening: true,
        isOpen: true
      }, () => {
        setTimeout(() => {
          this.setState({
            isOpening: false
          })
        }, 500)
      })
    })
  }

  close() {
    this.setState({isOpen: false})

    setTimeout(() => {
      this.setState({
        isClosing: true,
      }, () => {
        setTimeout(() => {
          this.setState({
            isClosing: false,
            isClosed: true
          })
          if (typeof this.props.onClose === 'function')
            this.props.onClose();
        }, 500)
      })

    })
  }

  render() {
    let modalClasses = cx('Modal', {
      [this.props.className]: this.props.className || '',
      'Modal--is-opening': this.state.isOpening,
      'Modal--is-open': this.state.isOpen,
      'Modal--is-closing': this.state.isClosing,
      'Modal--is-closed': this.state.isClosed
    })

    return (
      <div className={modalClasses}>
        <div className="ModalScrim" onTouchTap={this.close.bind(this)}></div>
        <div className="ModalContent">
          {this.props.children}
        </div>
      </div>
    );
  }

}

/*
  Modal Portal
 */
class ModalPortal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.node = document.createElement('div');
    this.node.className = 'ModalPortal';
    document.body.appendChild(this.node);
    // this.renderPortal(this.props);
  }

  componentDidUnmount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    this.renderPortal(this.props);
  }

  componentWillReceiveProps(nextProps) {
  }

  renderPortal(props) {
    this.portal = React.render(<Modal {...props}/>, this.node);
  }

  render() {
    return null;
  }
}

export default ModalPortal;