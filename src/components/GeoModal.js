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
      this.refs.autoComplete.focus();
  }

  render() {
    const {open, narrow, geo} = this.props;

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
        show={open}
        closeOnOuterClick={true}
        scaleBounce={narrow ? 1 : 1}
        startY={narrow ? 0 : -50}
        style={styles.container}
        onClose={e => this.context.closeModal('geo')}
        containerStyle={narrow ? styles.contentNarrow : styles.contentWide}>

        <div>
          <Flex align='center' justify='space-between' style={styles.header}>
            <Heading level={narrow ? 4 : 3} style={{marginLeft: 10, marginRight: 10}}>Change Neighborhood</Heading>
            <Button icon='close' color={colors.grey500} onClick={e => this.context.closeModal('geo')}/>
          </Flex>

          <div style={{padding: narrow ? '20px' : '0'}}>
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
