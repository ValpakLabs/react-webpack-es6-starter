import React, {Component, PropTypes} from 'react';
import debounce from '../utils/debounce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateViewport } from '../actions/viewportActions';
import { setUserGeo } from '../actions/userActions';
import { viewportSizeSelector } from '../reducers/viewport';
import { Motion, spring } from 'react-motion';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import Flex from './Flex';
import Modal from './Modal';
import Button from './Button';
import BrandDrawer from './BrandDrawer';
import GeoModal from './GeoModal';
import SearchModal from './SearchModal';

import '../scss/App.scss';

function mapStateToProps(state) {
  return {
    user: state.user,
    ...viewportSizeSelector(state)
  };
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandDrawerOpen: false,
      geoModalOpen: false,
      searchModalOpen: false
    };
    this.handleViewportResize = debounce(this.handleViewportResize, 100).bind(this);
  }

  getChildContext() {
    return {
      appContext: this.context.store.getState().config.get('appContext'),
      viewportSize: this.props.viewportSize,
      toggleBrandDrawer: () => this.toggleBrandDrawer(),
      openModal: (name) => this.openModal(name),
      closeModal: (name) => this.closeModal(name)
    };
  }

  componentDidMount() {
    this.handleViewportResize();
    window.addEventListener('resize', this.handleViewportResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleViewportResize);
  }

  componentDidUpdate(prevProps, prevState) {
    const narrow = this.props.viewportSize === 'xs' || this.props.viewportSize === 'sm';
    const wasNarrow = prevProps.viewportSize === 'xs' || prevProps.viewportSize === 'sm';
    if (!narrow && wasNarrow && this.state.brandDrawerOpen)
      this.setState({brandDrawerOpen: false});
  }

  render() {
    const narrow = this.props.viewportSize === 'xs' || this.props.viewportSize === 'sm';

    return (
      <div style={{height: '100vh', overflow: this.state.brandDrawerOpen ? 'hidden' : 'visible', position: this.state.brandDrawerOpen ? 'fixed' : 'relative'}}>
        {narrow && <BrandDrawer user={this.props.user.toJS()}/>}
        <Motion
          ref='motion'
          style={{x: spring(this.state.brandDrawerOpen ? 260 : 0, [800, 45])}}>
          {style =>
            <div
              ref='mainContent'
              style={{
                width: '100vw',
                background: '#FFF',
                position: 'relative',
                zIndex: 2,
                boxShadow: '-1px 0px 8px rgba(0,0,0,0.3)',
                transform: `translateX(${style.x}px)`,
              }}>
              {React.cloneElement(this.props.children, {
                user: this.props.user,
                viewportSize: this.props.viewportSize
              })}
            </div>
          }
        </Motion>

        <GeoModal
          user={this.props.user.toJS()}
          open={this.state.geoModalOpen}
          narrow={narrow}
          setGeo={this.props.setUserGeo}/>

        <SearchModal
          open={this.state.searchModalOpen}
          narrow={narrow}/>
      </div>
    );
  }

  toggleBrandDrawer() {
    this.setState({brandDrawerOpen: !this.state.brandDrawerOpen});
  }

  openModal(name) {
    this.setState({[`${name}ModalOpen`]: true});
  }

  closeModal(name) {
    this.setState({[`${name}ModalOpen`]: false});
  }

  handleViewportResize() {
    this.props.updateViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
}

Main.fetchData = async (getState, dispatch, location, params) => {
  if (getState().user.get('device').get('type') !== 'phone') {
    return dispatch(updateViewport({
      width: 1024,
      height: 1024
    }));
  }
};

Main.contextTypes = {
  store: PropTypes.object.isRequired,
};

Main.childContextTypes = {
  appContext: PropTypes.string,
  viewportSize: PropTypes.string.isRequired,
  toggleBrandDrawer: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};

export default connect(mapStateToProps, {updateViewport, setUserGeo})(Main);
