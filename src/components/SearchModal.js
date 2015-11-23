import React, {Component, PropTypes} from 'react';
import Color from 'color';
import colors, {brand} from '../theme/colors';
import Flex from './Flex';
import Modal from './Modal';
import Button from './Button';
import Heading from './Heading';
import Search from './Search';

class SearchModal extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open)
      setTimeout(() => this.refs.search.focus());
    if (!this.props.narrow && this.props.open)
      this.context.closeModal('search');
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
        ref='modal'
        show={open}
        closeOnOuterClick={true}
        scaleBounce={narrow ? 1 : 1}
        startY={narrow ? 0 : -50}
        style={styles.container}
        onClose={e => this.context.closeModal('search')}
        containerStyle={narrow ? styles.contentNarrow : styles.contentWide}>

        <div ref='modalContent'>
          <Flex align='center' justify='space-between' style={styles.header}>
            <Search
              ref='search'
              narrow={narrow}/>
            <Button
              className='close-search-modal'
              ref='closeModalButton'
              icon='close'
              color={colors.grey500}
              onTouchEnd={e => this.handleCloseModal('search')}/>
          </Flex>


        </div>

      </Modal>
    );
  }

  handleCloseModal(name) {
    this.context.closeModal(name);
  }
}

SearchModal.contextTypes = {
  closeModal: PropTypes.func
};

SearchModal.defaultProps = {
  open: false,
  narrow: false
};

export default SearchModal;
