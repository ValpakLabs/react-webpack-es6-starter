import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { fetchBalefirePage } from '../actions/fetchActions';
import { viewportSizeSelector } from '../reducers/viewport';
import ErrorPage from './ErrorPage';
import responsive from './responsive';

function mapStateToProps(state) {
  return {
    page: state.balefirePage,
    user: state.user,
    ...viewportSizeSelector(state)
  };
}

class BalefirePage extends Component {

  render() {
    const {page, user, viewportSize} = this.props;
    const templateName = page.getIn(['template', 'templateName']);

    try {
      const template = require(`./BFPT${templateName}`);
      return React.createElement(template, {
        page,
        user,
        viewportSize: viewportSize
      });
    } catch (error) {
      return <ErrorPage user={user} viewportSize={viewportSize} />;
    }
  }

}

BalefirePage.fetchData = async (getState, dispatch, location, params) => {
  const splat = params.splat || 'root/home';
  await dispatch(fetchBalefirePage(splat));
};

export default connect(mapStateToProps)(BalefirePage);
