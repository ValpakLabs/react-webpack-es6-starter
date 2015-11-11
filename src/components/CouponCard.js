import React from 'react';
import Card from './Card';
import clamp from '../utils/clamp';

class CouponCard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let titleMaxLines = 3;
    let descriptionMaxLines = 3;

    let titleNode = React.findDOMNode(this.refs.offerTitle);
    let descriptionNode = React.findDOMNode(this.refs.offerDescription);
    let typeLabelNode = React.findDOMNode(this.refs.offerTypeLabel);

    if (titleNode)
      clamp(titleNode, {clamp: titleMaxLines});
    
    if (descriptionNode)
      clamp(descriptionNode, {clamp: descriptionMaxLines});

    let heightElements = [
      this.getNodeHeightWithLines(titleNode, titleMaxLines),
      this.getNodeHeightWithLines(descriptionNode, descriptionMaxLines),
      this.getNodeHeightWithLines(typeLabelNode)
    ];

    let totalContentHeight = heightElements.reduce((total, height) => height + total);

    React.findDOMNode(this.refs.content).style.height = `${totalContentHeight}px`;
  }

  render() {
    return (
      <Card 
        ref="card"
        className="CouponCard"
        bannerImgSrc={this.props.bannerUrl}
        badgeImgSrc={this.props.logoUrl}
        primaryBtnText="Redeem Offer"
        secondaryBtnText="More Like This"
        bannerHeight={this.props.bannerHeight}>
        
        <div ref="content">
          
          {this.props.typeLabel ? (
            <p className="CouponCard__content__type-label" ref="offerTypeLabel">{this.props.typeLabel}</p>
          ) : ''}

          <h2 className="CouponCard__content__title"ref="offerTitle">{this.props.title}</h2>
          
          {this.props.description ? (
            <p className="CouponCard__content__description" ref="offerDescription">{this.props.description}</p>
          ) : ''}

        </div>

      </Card>  
    )
  }

  setContentHeight() {
    let titleMaxLines = 3;
    let descriptionMaxLines = 3;

    let titleNode = React.findDOMNode(this.refs.offerTitle);
    let descriptionNode = React.findDOMNode(this.refs.offerDescription);
    let typeLabelNode = React.findDOMNode(this.refs.offerTypeLabel);

    if (titleNode)
      clamp(titleNode, {clamp: titleMaxLines});
    
    if (descriptionNode)
      clamp(descriptionNode, {clamp: descriptionMaxLines});

    let heightElements = [
      this.getNodeHeightWithLines(titleNode, titleMaxLines),
      this.getNodeHeightWithLines(descriptionNode, descriptionMaxLines),
      this.getNodeHeightWithLines(typeLabelNode)
    ];

    let totalContentHeight = heightElements.reduce((total, height) => height + total);

    React.findDOMNode(this.refs.content).style.height = `${totalContentHeight}px`;
  }

  getNodeHeightWithLines(node, lines=1) {
    if (!node) return 0;
    let styles = getComputedStyle(node);
    let height = (parseInt(styles['line-height']) * lines) + 
                  parseInt(styles['margin-top']) + 
                  parseInt(styles['margin-bottom']);

    return height;
  }

}

CouponCard.defaultProps = {
  type: 'local',
  title: 'Offer Title',
  description: '',
  logoUrl: null,
  bannerUrl: null,
  offerUrl: null,
  typeLabel: '',
  titleMaxLines: 3,
  descriptionMaxLines: 3,
  bannerHeight: 160,

  onPrimaryAction: function(){},
  onSecondaryAction: function(){}
}

export default CouponCard;