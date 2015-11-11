import React from 'react';
import Circle from './Circle';

class Ripple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ripples: [{key: 0,started: false,ending: false}]
    };
  }

  render() {
    // let style= {
    //   position: 'absolute',
    //   zIndex: this.props.zIndex
    // }

    return (
      <div 
        onTouchStart={this.handleTouchStart.bind(this)}
        onMouseDown={this.handleTouchStart.bind(this)}
        onTouchEnd={this.handleTouchEnd.bind(this)}
        onMouseUp={this.handleTouchEnd.bind(this)}
        onMouseLeave={this.handleTouchEnd.bind(this)}
        onTouchTap={this.handleTouchTap.bind(this)}>
          
        <div className="Ripple" ref="ripple">
          {this.getRipples()}
        </div>
 
        {this.props.children}
      </div>
    );
  }

  handleTouchStart(e) {
    if (!this.props.focusRipple)
      this.start(e.nativeEvent.pageX, e.nativeEvent.pageY);
  }

  handleTouchTap(e) {
    if (this.props.focusRipple && typeof this.props.onTouchTap === 'function')
      this.props.onTouchTap(e);
  }

  handleTouchEnd(e) {
    if (!this.props.focusRipple)
      this.end(e);
  }

  start(x, y) {
    if (!this.props.enabled) return;

    var ripples = this.state.ripples;
    var nextKey = ripples[ripples.length-1].key + 1;
    var style = this.getRippleStyle(x, y);
    var ripple;

    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (!ripple.started) {
        ripple.started = true;
        ripple.style = style;
        break;
      }
    };

    ripples.push({
      key: nextKey,
      started: false,
      ending: false
    })

    this.setState({
      ripples: ripples
    })
  }

  end() {
    if (!this.props.enabled) return;

    var ripples = this.state.ripples;
    var ripple;
    var endingRipple;

    //End the the next un-ended ripple
    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (ripple.started && !ripple.ending) {
        ripple.ending = true;
        endingRipple = ripple;
        break;
      }
    };

    //Only update if a ripple was found
    if (endingRipple) {
      //Re-render
      this.setState({
        ripples: ripples
      });

      //Wait 2 seconds and remove the ripple from DOM
      setTimeout(function() {
        ripples.shift();        
        this.setState({
          ripples: ripples
        });
      }.bind(this), 2000);
    }
  }

  getRipples() {
    if (!this.props.enabled) return;

    return this.state.ripples.map(ripple => {
      return (
        <Circle 
          key={ripple.key}
          started={ripple.started}
          ending={ripple.ending}
          style={ripple.style}
        />
      );
    })
  }

  getRippleStyle(pageX=0, pageY=0) {
    var el = this.refs.ripple.getDOMNode();
    var bounds = el.getBoundingClientRect();

    var style = {}
    var top;
    var bottom;
    var left;
    var right;
    var maxXDistance;
    var maxYDistance;
    var hypotenuse;

    top = Math.abs(pageY - bounds.top);
    bottom = Math.abs(pageY - bounds.bottom);
    left = Math.abs(pageX - bounds.left);
    right = Math.abs(pageX - bounds.right);
    
    if (!this.props.center) {
      maxXDistance = Math.max(left, right);
      maxYDistance = Math.max(top, bottom);
      hypotenuse = Math.sqrt(Math.pow(maxXDistance,2) + Math.pow(maxYDistance,2));

      style.width = style.height = hypotenuse * 2;
      style.top = top - (style.height/2);
      style.left = left - (style.width/2);

      return style;
    }

    return {
      width: bounds.width * 1.25,
      height: bounds.height * 1.25,
      top: bounds.height * -0.125,
      left: bounds.width * -0.125
    }
  }

}

Ripple.propType = {
  enabled: React.PropTypes.bool,
  center: React.PropTypes.bool,
  focusRipple: React.PropTypes.bool,
  zIndex: React.PropTypes.number
};

Ripple.defaultProps = {
  enabled: true,
  center: false,
  focusRipple: true,
  zIndex: 1
};

export default Ripple;