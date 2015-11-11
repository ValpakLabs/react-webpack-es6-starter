import React from 'react';
import cx from 'classnames';

class Picture extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.screen) return null; 

    let imageAttrs = this.getImageAttributes();

    let classes = cx('Picture', {
      [this.props.className]: this.props.className || ''
    })

    let containerStyles = {
      width: imageAttrs.width,
      height: imageAttrs.height,
      margin: this.props.margin
    };

    let imageStyles = {
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%'
    }

    return (
      <div style={containerStyles} className={classes}>
        <img src={imageAttrs.src} style={imageStyles}/>
      </div>
    );
  }

  getImageAttributes() {
    return this.props[this.props.screen];
  }

}

Picture.defaultProps = {
  screen: 'handheld',
  handheld: {src: null, width: 'auto', height: 'auto'},
  tablet:   {src: null, width: 'auto', height: 'auto'},
  desktop:  {src: null, width: 'auto', height: 'auto'},
  margin:   0
};

Picture.propTypes = {
  screen:   React.PropTypes.string,
  handheld: React.PropTypes.object,
  tablet:   React.PropTypes.object,
  desktop:  React.PropTypes.object,
  margin:   React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default Picture;