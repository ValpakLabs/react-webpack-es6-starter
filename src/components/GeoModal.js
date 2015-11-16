import React, {Component, PropTypes} from 'react';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import Flex from './Flex';
import Modal from './Modal';
import Button from './Button';
import Heading from './Heading';
import GeoAutoComplete from './GeoAutoComplete';

const styles = {
  geoModalWide: {
    padding: 0,
    margin: '120px auto 0 auto',
    width: 600,
    backgroundColor: colors.grey100,
    borderRadius: 3,
    overflow: 'hidden'
  },
  geoModalNarrow: {
    backgroundColor: colors.grey100,
    position: 'fixed',
    padding: 0,
    margin: 0,
    width: '100vw',
    overflow: 'hidden',
    height: '100vh'
  }
};

class GeoModal extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open)
      this.refs.autoComplete.focus();
  }

  render() {
    const {open, narrow, geo} = this.props;
    return (
      <Modal
        show={open}
        closeOnOuterClick={true}
        scaleBounce={narrow ? 1 : 0.8}
        style={{width: '100%', background: Color(brand.primary).alpha(0.9).rgbaString(), fontFamily: 'inherit'}}
        onClose={e => this.context.closeModal('geo')}
        containerStyle={narrow ? styles.geoModalNarrow : styles.geoModalWide}>

        <div>
          <Flex align='center' justify='space-between' style={{backgroundColor: colors.white, padding: '4px 4px', borderBottom: `1px solid ${colors.grey300}`}}>
            <Heading level={narrow ? 4 : 3} style={{marginLeft: 10, marginRight: 10}}>Change Neighborhood</Heading>
            <Button icon='close' onClick={e => this.context.closeModal('geo')}/>
          </Flex>

          <div style={{padding: narrow ? '20px' : '0'}}>
            {/*<div style={{textAlign: 'right', color: colors.grey800, lineHeight: '16px', marginBottom: 6}}>{geo.city}, {geo.state} {geo.postalCode}</div>*/}
            <GeoAutoComplete
              ref='autoComplete'
              narrow={narrow}
              currentGeo={geo}
              onGeoSelected={::this.setUserGeo} />
          </div>
        </div>

      </Modal>
    );
  }

  setUserGeo(geo) {
    if (typeof geo !== 'string' && geo.city && geo.state)
      geo = `${geo.city},%20${geo.state}`;
    this.props.setGeo(geo);
    this.context.closeModal('geo');
  }
}

GeoModal.contextTypes = {
  closeModal: PropTypes.func
};

export default GeoModal;
