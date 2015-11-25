import React, {Component, PropTypes} from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions/fetchActions';
import { viewportSizeSelector } from '../reducers/viewport';
import colors from '../theme/colors';
import BasePage from './BasePage';
import Flex from './Flex';
import Heading from './Heading';
import Collection from './Collection';
import Listing from './Listing';
import Icon from './Icon';
import Container from './Container';

function mapStateToProps(state) {
  return {
    page: state.page,
    user: state.user,
    ...viewportSizeSelector(state)
  };
}

class CollectionPage extends Component {

  render() {
    const { page, user, viewportSize } = this.props;
    const { collection } = page.toJS();

    const styles = {
      base: {

      }
    };

    return (
      <BasePage
        user={this.props.user}
        viewportSize={viewportSize}>

        <Container style={{padding: '40px 0', marginBottom: 20}}>
          <Collection
            viewportSize={viewportSize}
            layout={{
              lg: 'xtallboy',
              md: 'xtallboy'
            }}
            title={collection.title}
            items={collection.items}/>
        </Container>

      </BasePage>
    );
  }

}

CollectionPage.fetchData = async (getState, dispatch, location, params) => {
  const id = params.collectionId.replace('-', '_');
  await dispatch(fetchCollection(id));
};

CollectionPage.propTypes = {
  page: PropTypes.instanceOf(Map),
  user: PropTypes.instanceOf(Map),
  viewportSize: PropTypes.string
};

CollectionPage.defaultProps = {
  page: Map(),
  user: Map(),
  viewportSize: 'xs'
};

export default connect(mapStateToProps)(CollectionPage);
