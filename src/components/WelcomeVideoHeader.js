import React    from 'react';
import cx       from 'classnames';

import Picture  from './Picture';
import Video  from './Video';
import Search  from './Search';
import Ripple  from './Ripple';
import Card  from './Card';
import AutoSuggest  from './AutoSuggest';
import AutoSuggestList  from './AutoSuggestList';

class WelcomeVideoHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videoReady: false,
      searchFocused: false,
      introPending: true,
      currentSearchText: '',
      searchSuggestions: [],
      isScrolling: false
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if (!this.context.device.is_mobile)
      window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    if (!this.context.device.is_mobile)
      window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate() {
    this.setAutoSuggestListPosition()
  }

  render() {

    let classes = cx('WelcomeVideoHeader', {
      'WelcomeVideoHeader--mobile': this.context.device.is_mobile,
      'WelcomeVideoHeader--desktop': !this.context.device.is_mobile,
      'WelcomeVideoHeader--video-is-ready': this.state.videoReady,
      'WelcomeVideoHeader--search-is-focused': this.state.searchFocused,
      'WelcomeVideoHeader--intro-pending': this.state.introPending,
      'WelcomeVideoHeader--is-scrolling': this.state.isScrolling
    });

    let logoProps = {
      handheld: {
        src: `${this.context.appContext}/img/ValpakLogo.H.4C.reverse.png`,
        width: '100%'
      },
      tablet: {
        src: `${this.context.appContext}/img/ValpakLogo.H.4C.reverse.png`,
        width: '100%'
      },
      desktop: {
        src: `${this.context.appContext}/img/ValpakLogo.H.4C.reverse.png`,
        width: '100%'
      }
    };

    let taglineProps = {
      handheld: {
        src: `${this.context.appContext}/img/USB2CTaglineWavyCentered.reverse.png`,
        width: '100%'
      },
      tablet: {
        src: `${this.context.appContext}/img/USB2CTaglineWavyCentered.reverse.png`,
        width: '100%'
      },
      desktop: {
        src: `${this.context.appContext}/img/USB2CTaglineWavyCentered.reverse.png`,
        width: '100%'
      }
    };

    let autoSuggestList = (
      <AutoSuggestList
        ref="autoSuggestList"
        show={this.state.searchFocused}
        items={this.state.currentSearchText !== '' ? this.state.searchSuggestions : []}
        onItemSelected={this.handleAutoSuggestItemSeleted.bind(this)}
        onLocationChangeTap={this.handleLocationChangeTap.bind(this)}
        currentGeo={this.context.currentGeo}/>
    );

    return (
      <div className={classes} onKeyUp={this.handleKeyUp.bind(this)}>

        <div className="hero--master" ref="hero">

          <Video
            ref="brandVideo"
            isMobile={this.context.device.is_mobile}
            src="https://vpdev.valpak.com/react-sandbox/vpvideowelcome/video/statefair.mp4"
            poster={`${this.context.appContext}/img/primary-background.jpg`}
            onReady={this.onVideoReady.bind(this)}/>

          <div className="hero--master__content" ref="brandContent">

            <div className="logo--valpak" ref="brandLogo">
              <Picture
                screen={this.context.screenType}
                handheld={logoProps.handheld}
                tablet={logoProps.tablet}
                desktop={logoProps.desktop}
              />
            </div>

            <div className="tagline--valpak" ref="brandTagline">
              <Picture
                screen={this.context.screenType}
                handheld={taglineProps.handheld}
                tablet={taglineProps.tablet}
                desktop={taglineProps.desktop}
              />
            </div>

            <Ripple
              ref="searchRipple"
              enabled={true}
              focusRipple={true}
              onTouchTap={this.blurSearch.bind(this)}/>

            <div className="search--master" ref="brandSearch">

              <AutoSuggest
                geo={this.context.currentGeo}
                term={this.state.currentSearchText}
                onResponse={this.handleAutosuggestResponse.bind(this)}
                onError={this.handleAutosuggestError.bind(this)}/>

              <Search
                ref="searchField"
                onFocus={this.focusSearch.bind(this)}
                onBlur={this.context.device.is_mobile ? this.blurSearch.bind(this) : null}
                onChange={this.handleSearchInput.bind(this)}/>

            </div>

          </div>

        </div>

        {autoSuggestList}

      </div>
    );
  }

  onVideoReady() {
    this.setState({videoReady: true});
    setTimeout(() => {
      this.setState({introPending: false})
    }, 2000)
  }

  handleSearchInput(text) {
    this.setState({
      currentSearchText: text
    })
  }

  focusSearch(y, x) {
    if (!this.state.searchFocused) {
      this.setState({searchFocused: true});
      if (!this.context.device.is_mobile) {
        this.refs.searchRipple.start(x, y)
      } else {
        let searchNode = React.findDOMNode(this.refs.searchField);
      }
    }
  }

  blurSearch() {
    if (this.state.searchFocused) {
      this.setState({searchFocused: false});
      if (!this.context.device.is_mobile)
        this.refs.searchRipple.end()
    }
  }

  handleAutosuggestResponse(res) {
    this.setState({
      searchSuggestions: res
    }, this.setAutoSuggestListPosition);
  }

  setAutoSuggestListPosition() {
    if (!this.state.searchFocused) return

    let searchNode = React.findDOMNode(this.refs.searchField);
    let searchNodeBounds = searchNode.getBoundingClientRect();
    let autoSuggestListNode = React.findDOMNode(this.refs.autoSuggestList);
    let scrollTop = document.body.scrollTop;

    if (!this.context.device.is_mobile) {
      autoSuggestListNode.style.top = `${searchNodeBounds.top - autoSuggestListNode.clientHeight}px`;
      autoSuggestListNode.style.left = `${searchNodeBounds.left}px`;
      autoSuggestListNode.style.width = `${searchNodeBounds.width}px`;
    }
    else {
      autoSuggestListNode.style.top = `${searchNodeBounds.top + scrollTop + searchNodeBounds.height + 10}px`;
      autoSuggestListNode.style.left = `${1}%`;
      autoSuggestListNode.style.width = `${98}%`;
      setTimeout(() => {
        document.body.scrollTop = searchNode.offsetTop - 10;
      })
    }
  }

  handleAutosuggestError(err) {
    console.error(err);
  }

  handleKeyUp(e) {
    if (e.keyCode === 27 && this.state.searchFocused) {
      this.blurSearch()
    }
  }

  handleAutoSuggestItemSeleted(item) {
    if (item.businessType === 'AFFILIATE' && item.bppURL)
      window.location.href = item.bppURL;
    else if (item.businessType === 'LOCAL' && item.bppURL)
      window.location.href = 'https://vpdev.valpak.com/coupons' + item.bppURL;
    else if (item.businessType = "TOP_SEARCH")
      window.location = `https://vpdev.valpak.com/coupons/query?geo=los+angeles%2C+ca&f1=keyword&keywords=${item.alias}`;
  }

  handleScroll(e) {
    
    if (!this.state.isScrolling) {
      clearTimeout(this.timeout);
      this.setState({isScrolling: true});
      this.timeout = setTimeout(() => {
        this.setState({isScrolling: false});
      }, 1000);
    }

    let scrollTop = document.body.scrollTop;
    let logo = React.findDOMNode(this.refs.brandLogo);
    let tagline = React.findDOMNode(this.refs.brandTagline);
    let search = React.findDOMNode(this.refs.brandSearch);
    let video = React.findDOMNode(this.refs.brandVideo);
    let hero = React.findDOMNode(this.refs.hero);

    hero.style.top = `${-scrollTop * 0.2}px`;
    logo.style.top = `${-scrollTop * 0.5}px`;
    tagline.style.top = `${-scrollTop * 0.5}px`;
    search.style.top = `${-scrollTop * 0.7}px`;
    // video.style.marginTop = `${-scrollTop * 0.8}px`;
  }

  handleLocationChangeTap(e) {
    if (typeof this.props.onLocationChangeRequest === 'function')
      this.props.onLocationChangeRequest(e);
  }

}

WelcomeVideoHeader.contextTypes = {
  appContext: React.PropTypes.string.isRequired,
  screenType: React.PropTypes.string.isRequired,
  device: React.PropTypes.object.isRequired,
  currentGeo: React.PropTypes.string.isRequired
}

export default WelcomeVideoHeader;