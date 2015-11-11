import React    from 'react';
import cx       from 'classnames';
import OfferData from '../utils/mock-data';

import Grid   from './Grid';
import Header   from './Header';
import WelcomeVideoHeader   from './WelcomeVideoHeader';
import Card  from './Card';
import CouponCard  from './CouponCard';
import Carousel  from './Carousel';
import Modal from './Modal';
import GeoAutoComplete from './GeoAutoComplete';
import Icon from './Icon';
import Picture  from './Picture';


class WelcomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      videoReady: false,
      searchFocused: false,
      introPending: true,
      useCarousel: false,
      modalShowing: false,
      geoSearchTerm: '',
      currentGeo: "",
      pendingLoad: true
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if (!this.context.device.is_mobile)
      window.addEventListener('scroll', this.handleScroll)

    setTimeout(() => {
      this.setState({pendingLoad: false})
    }, 500)
  }

  componentWillUnmount() {
    if (!this.context.device.is_mobile)
      window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.context.screenType === 'handheld' && !this.state.useCarousel && this.context.device.is_mobile) {
      this.setState({useCarousel: true})
    } else if (this.context.screenType !== 'handheld' && this.state.useCarousel) {
      this.setState({useCarousel: false})
    }
  }

  render() {
    let classes = cx('WelcomePage', {
      'WelcomePage--is-loaded': !this.state.pendingLoad, 
      'WelcomePage--is-pending': this.state.pendingLoad, 
      'WelcomePage--mobile': this.context.device.is_mobile,
      'WelcomePage--desktop': !this.context.device.is_mobile,
    });

    let carouselClasses = cx('CarouselWrapper', {
      'Carousel--is-active': this.state.useCarousel,
      'contain':true
    })

    let offers = OfferData(this.context.appContext);

    let logoProps = {
      handheld: {
        src: `${this.context.appContext}/img/valpak.wordmark.1c.reversed.png`
      },
      tablet: {
        src: `${this.context.appContext}/img/valpak.wordmark.1c.reversed.png`
      },
      desktop: {
        src: `${this.context.appContext}/img/valpak.wordmark.1c.reversed.png`
      }
    };

    let featuredOfferCards = offers.getFeaturedOffers().map((offer, key) => {
      return (
        <CouponCard
          key={key}
          bannerUrl={offer.imageUrl}
          logoUrl={offer.logoUrl}
          title={offer.title}
          typeLabel="In-Store Coupon"/>
      );
    });

    let topAffiliateMiniCards = offers.getTopAffiliateOffers().map((offer, key) => {
      return (
        <Card
          key={key}
          type="mini"
          cardHeight={172}
          bannerImgSrc={offer.logoUrl}
          bannerHeight={'50%'}
          bannerSizing={'fit'}
          bannerPadding={'12px 24px'}
          onTouchTap={this.handleTap.bind(this)}>
          <p>{offer.title}</p>
        </Card>
      );
    });

    let topAffiliateMiniCardsColumns;
    let featuredOfferCardsColumns;

    topAffiliateMiniCardsColumns = {
      xl: 5, lg: 5, md: 5, sm: 5, xs: 3, xxs: 2
    }[this.context.breakpoint];

    featuredOfferCardsColumns = {
      xl: 3, lg: 3, md: 3, sm: 2, xs: 2, xxs: 1
    }[this.context.breakpoint];

    return (
      <div className={classes}>

        <Header 
          className="Header--welcome-bar"
          show={true}
          color={[0, 160, 223]}>
          <div>
            <div>
              <Icon 
                className="Header__icon"
                level="reverse"
                path="navigation/svg/production/ic_menu_36px.svg"/>
              <Picture
                className="Header__brand-logo"
                screen={this.context.screenType}
                handheld={logoProps.handheld}
                tablet={logoProps.tablet}
                desktop={logoProps.desktop}
                margin="0 8px"/>
            </div>
            <div>
              <Icon 
                className="Header__icon"
                level="reverse"
                path="action/svg/production/ic_search_48px.svg"/>
              
              <button className="Button--icon" onTouchTap={this.toggleModal.bind(this)}>
                <Icon 
                  className="Header__icon"
                  level="reverse"
                  path="maps/svg/production/ic_place_48px.svg"/>
              </button>
            </div>
          </div>
        </Header>

        <WelcomeVideoHeader onLocationChangeRequest={this.toggleModal.bind(this)}/>

        <div className="content--master">

            <div className="featured-mini-cards">
              <div className="contain">
                <h2 className="title--section">Online Savings from Top Brands</h2>
                
                <Grid 
                  cols={topAffiliateMiniCardsColumns} 
                  gutter={1/12}>
                  {topAffiliateMiniCards}
                </Grid>

              </div>
            </div>

            <div className="feature-cards">
              {this.state.useCarousel ? (
                <div className={carouselClasses}>
                  <h2 className="title--section">Featured Offers in Top Categories</h2>
                  <Carousel auto={5000}>{featuredOfferCards}</Carousel>
                </div>
                ) : (
                <div className="contain">
                  <h2 className="title--section">Featured Offers in Top Categories</h2>
                  <Grid cols={featuredOfferCardsColumns} gutter={1/12}>
                    {featuredOfferCards}
                  </Grid>
                </div>
                )
              }
            </div>

            <div className="feature-articles">
              <div className="contain">

              </div>
            </div>
          
        </div>

        <Modal 
          show={this.state.modalShowing}
          onClose={this.handleModalClose.bind(this)}>
          
          <div className="Modal--geo-change">
            <h2 className="">Your Location: <span className="Modal--geo-change__current-geo">{this.context.currentGeo}</span></h2>
            <h1 className="title--section">Where would you like to save?</h1>
            <form ref="geoChangeForm" onSubmit={this.handleGeoChangeSubmit.bind(this)}>
              <input ref="geoInputField" placeholder="ex: Tampa, FL or 33773" onChange={this.handleGeoInputChange.bind(this)} value={this.state.geoSearchTerm}></input>
            </form>
            <GeoAutoComplete 
              term={this.state.geoSearchTerm} 
              onGeoFocus={this.handleGeoFocus.bind(this)}
              onGeoSelected={this.handleGeoSelected.bind(this)}/>
          </div>

        </Modal>

      </div>
    );
  }

  handleTap(e) {
    alert('tap!')
  }

  handleScroll(e) {
    
  }

  toggleModal(e) {
    this.setState({
      modalShowing: !this.state.modalShowing
    }, () => {
      if (this.state.modalShowing) 
        React.findDOMNode(this.refs.geoInputField).focus();
    })
  }

  handleGeoInputChange(e) {
    this.setState({
      geoSearchTerm: e.target.value
    })
  }

  handleGeoSelected(geo) {
    let location = `${geo.city}, ${geo.state}`;
    React.findDOMNode(this.refs.geoInputField).value = location;
    this.submitGeoForm();
  }

  handleGeoFocus(geo) {
    let location = `${geo.city}, ${geo.state}`;
    React.findDOMNode(this.refs.geoInputField).value = location;
  }

  handleGeoChangeSubmit(e) {
    e.preventDefault();
    this.submitGeoForm();
  }

  handleModalClose(cb) {
    this.setState({
      modalShowing: false,
      geoSearchTerm: ''
    }, cb)
  }

  submitGeoForm() {
    let geoInputField = React.findDOMNode(this.refs.geoInputField);
    let geoValue = geoInputField.value;
    
    geoInputField.blur();

    this.setState({modalShowing: false}, () => {
      setTimeout(() => {
        this.props.onGeoChange(geoValue)
      }, 0)
    });
  }

}

WelcomePage.contextTypes = {
  appContext: React.PropTypes.string.isRequired,
  screenType: React.PropTypes.string.isRequired,
  device: React.PropTypes.object.isRequired,
  breakpoint: React.PropTypes.string.isRequired,
  currentGeo: React.PropTypes.string.isRequired
}

export default WelcomePage;