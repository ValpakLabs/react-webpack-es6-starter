import React, {Component, PropTypes} from 'react';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import Flex from './Flex';
import Modal from './Modal';
import Button from './Button';
import Heading from './Heading';
import GeoAutoComplete from './GeoAutoComplete';

class GeoModal extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open)
      setTimeout(() => this.refs.autoComplete.focus());
  }

  render() {
    const {open, narrow, user} = this.props;
    const geo = user.geo;

    const styles = {
      container: {
        background: Color(colors.grey800).alpha(0.5).rgbaString()
      },
      contentWide: {
        padding: 0,
        margin: '0 auto 0 auto',
        width: 560,
        backgroundColor: colors.grey100,
        borderRadius: '0 0 3px 3px',
        overflow: 'hidden',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, .2)'
      },
      contentNarrow: {
        backgroundColor: colors.grey100,
        position: 'fixed',
        padding: 0,
        margin: 0,
        width: '100vw',
        overflow: 'hidden',
        height: '100vh'
      },
      header: {
        height: narrow ? 60 : 72,
        backgroundColor: colors.white,
        padding: '4px 4px',
        borderBottom: `1px solid ${colors.grey300}`
      }
    };

    return (
      <Modal
        ref='modal'
        show={open}
        closeOnOuterClick={true}
        scaleBounce={1}
        startY={narrow ? 0 : -50}
        style={styles.container}
        onClose={e => this.context.closeModal('geo')}
        containerStyle={narrow ? styles.contentNarrow : styles.contentWide}>

        <div ref='modalContent'>
          <Flex align='center' justify='space-between' style={styles.header}>
            <Heading
              level={narrow ? 4 : 3}
              style={{margin: '0 10px'}}>
              Change Neighborhood
            </Heading>
            <Button
              className='close-geo-modal'
              ref='closeModalButton'
              icon='close'
              color={colors.grey500}
              onClick={e => this.handleCloseModal('geo')}
              onTouchEnd={e => this.handleCloseModal('geo')}/>
          </Flex>

          <div style={{padding: narrow ? '20px' : '0'}}>
            <GeoAutoComplete
              ref='autoComplete'
              error={this.props.user.geoValidationError}
              narrow={narrow}
              currentGeo={geo}
              onGeoSelected={geo => this.setUserGeo(geo)} />
          </div>
        </div>

      </Modal>
    );
  }

  handleCloseModal(name) {
    this.context.closeModal(name);
  }

  setUserGeo(geo) {
    if (typeof geo !== 'string' && geo.city && geo.state)
      geo = `${geo.city},%20${geo.state}`;

    this.props.setGeo(geo).then(() => {
      if (!this.props.user.geoValidationError)
        this.context.closeModal('geo');
    });

  }
}

GeoModal.contextTypes = {
  closeModal: PropTypes.func
};

GeoModal.defaultProps = {
  open: false,
  narrow: false,
  user: {},
  setGeo: e => null
};

export default GeoModal;
