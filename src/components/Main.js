import React from 'react';
import debounce from '../utils/debounce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateViewport } from '../actions/viewportActions';
import { viewportSizeSelector } from '../reducers/viewport';

import '../scss/App.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleViewportResize = debounce(this.handleViewportResize, 100).bind(this);
  }

  getChildContext() {
    return {
      viewportSize: this.props.viewportSize
    };
  }

  componentDidMount() {
    this.handleViewportResize()
    window.addEventListener('resize', this.handleViewportResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleViewportResize);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  handleViewportResize() {
    this.props.updateViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
}

Main.fetchData = async (getState, dispatch, location, params) => {
  if (!getState().user.get('device').get('is_mobile')) {
    dispatch(updateViewport({
      width: 1024,
      height: 1024
    }));
  }
}

Main.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

Main.childContextTypes = {
  viewportSize: React.PropTypes.string.isRequired,
};

Main.propTypes = {

};

Main.defaultProps = {

};

export default connect(
  viewportSizeSelector,
  dispatch => bindActionCreators({updateViewport}, dispatch)
)(Main);
