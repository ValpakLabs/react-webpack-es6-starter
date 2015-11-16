import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { fetchBalefirePage } from '../actions/fetchActions';
import { viewportSizeSelector } from '../reducers/viewport';
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
    const {page, user} = this.props;
    const templateName = page.getIn(['template', 'templateName']);

    try {
      const template = require(`./BTmpl_${templateName}`);
      return React.createElement(template, {
        page,
        user,
        viewportSize: this.props.viewportSize
      });
    } catch(error) {
      return null;
    }
  }

}

BalefirePage.fetchData = async (getState, dispatch, location, params) => {
  const splat = params.splat || 'root/home';
  await dispatch(fetchBalefirePage(splat));
}

export default connect(mapStateToProps)(BalefirePage);
