import React from 'react';
import cx from 'classnames';
import getScreenType from '../utils/screen-state';
import debounce from '../utils/debounce';
import ResponsivePage from './ResponsivePage';
import WelcomePage from './WelcomePage';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenType: 'handheld',
      breakpoint: 'xxs',
      currentGeo: 'St. Petersburg, FL'
    };
  }

  getChildContext() {
    return {
      screenType: this.state.screenType,
      device: this.props.device || {},
      appContext: this.props.appContext || '',
      breakpoint: this.state.breakpoint,
      currentGeo: this.state.currentGeo
    };
  }

  render() {
    let classes = cx('App', {
      [`App--${this.state.screenType}`]: true
    });

    return (
      <div className={classes}>
        <ResponsivePage onBreakpointChange={this.handleBreakpointChange.bind(this)}>
          <WelcomePage onGeoChange={this.handleGeoChange.bind(this)}/>
        </ResponsivePage>
      </div>
    );
  }

  handleBreakpointChange(breakpointName, allBreakpoints) {
    let breakpointMinWidth = allBreakpoints[breakpointName];
    this.setState({
      screenType: getScreenType(breakpointMinWidth),
      breakpoint: breakpointName
    });
  }

  handleGeoChange(geo) {
    this.setState({currentGeo: geo});
  }

}

App.propTypes = {

};

App.defaultProps = {

};

App.childContextTypes = {
  device: React.PropTypes.object.isRequired,
  screenType: React.PropTypes.string.isRequired,
  appContext: React.PropTypes.string.isRequired,
  breakpoint: React.PropTypes.string.isRequired,
  currentGeo: React.PropTypes.string.isRequired
};

export default App;
