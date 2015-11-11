import React from 'react';
import coverBounds from '../utils/cover-bounds'
import AutoCover from './AutoCover';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    let rootClassName = 'Card';
    let modClassName = `${rootClassName}--${this.props.type}`;

    let classes = cx(rootClassName, {
      [this.props.className]: this.props.className ? this.props.className : '',
      [modClassName]: true
    });

    let styles = {
      miniCard: {
        height: this.props.cardHeight
      },
      featureCard: {

      },
      bannerImage: {
        display: 'block'
      },
      bannerWrapper: {
        overflow: 'hidden',
        width: '100%',
        height: this.props.bannerHeight,
        padding: this.props.bannerPadding
      }
    }

    let featureBody = (
      <div className="Card__inner">

        <div className="Card__banner__wrapper" style={styles.bannerWrapper}>
          <AutoCover
            ref="banner"
            className="Card__banner"
            fit={this.props.bannerSizing !== 'cover'}>
            <img className="Card__banner__image" src={this.props.bannerImgSrc} style={styles.bannerImage}/>
          </AutoCover>
        </div>

        {this.props.badgeImgSrc ? (
          <div className="Card__badge" ref="badge">
            <img className="Card__badge__image" src={this.props.badgeImgSrc} style={styles.bannerImage}/>
          </div>
        ) : ''}

        <div className="Card__flexible-wrapper">
          <div className="Card__content" ref="content">
            {this.props.children}
          </div>
          <div className="Card__footer">
            <button onTouchTap={this.handleSecondaryBtnTap.bind(this)} ref="secondaryBtn">{this.props.secondaryBtnText}</button>
            <button onTouchTap={this.handlePrimaryBtnTap.bind(this)} ref="primaryBtn">{this.props.primaryBtnText}</button>
          </div>
        </div>
      </div>
    );

    let miniBody = (
      <div className="Card--mini__inner">

        <div className="Card--mini__banner__wrapper" style={styles.bannerWrapper}>
          <AutoCover
            ref="banner"
            className="Card--mini__banner"
            fit={this.props.bannerSizing !== 'cover'}>
            <img className="Card--mini__banner__image" src={this.props.bannerImgSrc} style={styles.bannerImage}/>
          </AutoCover>
        </div>

        <div className="Card--mini__content" ref="content">
          {this.props.children}
        </div>
      </div>
    );

    return (
      <div 
        style={this.props.type === 'mini' ? styles.miniCard : styles.featureCard}
        onTouchTap={this.handleTouchTap.bind(this)}>
        {this.props.type === 'mini' ? miniBody : featureBody}
      </div>
    );
  }

  handlePrimaryBtnTap(e) {
    e.stopPropagation();
    this.props.onPrimaryBtnTap(e);
  }

  handleSecondaryBtnTap(e) {
    e.stopPropagation();
    this.props.onSecondaryBtnTap(e);
  }

  handleTouchTap(e) {
    this.props.onTouchTap(e);
  }
}

Card.propTypes = {
  type: React.PropTypes.oneOf(['feature', 'mini']),
  bannerImgSrc: React.PropTypes.string,
  badgeImgSrc: React.PropTypes.string,
  primaryBtnText: React.PropTypes.string,
  secondaryBtnText: React.PropTypes.string,
  bannerHeight: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  bannerPadding: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  bannerSizing: React.PropTypes.string,
  cardHeight: React.PropTypes.number,
  onPrimaryBtnTap: React.PropTypes.func,
  onSecondaryBtnTap: React.PropTypes.func,
  onTouchTap: React.PropTypes.func
}

Card.defaultProps = {
  type: 'feature',
  bannerImgSrc: '',
  badgeImgSrc: '',
  primaryBtnText: 'Primary',
  secondaryBtnText: 'Secondary',
  bannerHeight: 100,
  bannerPadding: 0,
  bannerSizing: 'cover',
  cardHeight: 200,
  onPrimaryBtnTap: function(){},
  onSecondaryBtnTap: function(){},
  onTouchTap: function(){}
};

export default Card;
