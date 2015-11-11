import React from 'react';
import cx from 'classnames';
import debounce from '../utils/debounce';

class ResponsivePage extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      breakpoint: 'xxs'
    };

    this.handleResize = this.handleResize.bind(this);
    this.setBreakpoint = debounce(this.setBreakpoint, 100);
  }

  componentDidMount() {
    this.setBreakpoint();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    let classNames = cx('ResponsivePage', {
      [`ResponsivePage--${this.state.breakpoint}`]: true
    });

    return (
      <div className={classNames}>
        {this.props.children}
      </div>
    );
  }

  handleResize(e) {
    this.setBreakpoint();
  }

  setBreakpoint() {
    let breakpoint = this.calculateBreakpoint();
    this.setState({breakpoint: breakpoint});

    if (typeof this.props.onBreakpointChange === 'function')
      this.props.onBreakpointChange(breakpoint, this.props.breakpoints)
  }

  calculateBreakpoint() {
    if (typeof window === 'undefined') return 'xxs';

    let breakpoints = this.props.breakpoints;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let breakpoint;
    
    let bpKeys = Object.keys(this.props.breakpoints);

    breakpoint = bpKeys.reduce((minKey, key) => {
      if (width >= breakpoints[key] && !minKey)
        return key
      return minKey;
    }, undefined)

    return breakpoint;
  }

}

ResponsivePage.defaultProps = {
  breakpoints: {
    xl: 1440, 
    lg: 1200, 
    md: 960, 
    sm: 768, 
    xs: 568, 
    xxs: 320
  },
  onBreakpointChange: null
}

export default ResponsivePage;