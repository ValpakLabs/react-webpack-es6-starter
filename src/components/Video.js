import React from 'react';
import { findDOMNode } from 'react-dom';
import coverBounds from '../utils/cover-bounds';

class Video extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      videoContainerWidth: 0,
      videoContainerHeight: 0
    }

    this.onVideoLoaded = this.onVideoLoaded.bind(this);
    this.updateSize = this.updateSize.bind(this);
  }

  componentDidMount() {
    if (!this.props.isMobile) {
      let video = findDOMNode(this.refs.video);
      video.addEventListener('loadeddata', this.onVideoLoaded);
    }

    if (this.props.isMobile && !this.state.loaded) {
      this.setState({loaded: true});
      if (typeof this.props.onReady === 'function') {
        setTimeout(() => {
          this.props.onReady()
        }, 200)
      }
    } else {
      this.updateSize();
    }
  }

  componentWillUnmount() {
    if (!this.props.isMobile) {
      let video = findDOMNode(this.refs.video);
      video.removeEventListener('loadeddata', this.onVideoLoaded);
    }
  }

  onVideoLoaded() {
    this.setState({loaded: true}, () => {
      this.updateSize();
      this.props.onReady();
    })
  }

  shouldComponentUpdate() {
    let videoContainer = findDOMNode(this.refs.videoContainer);
    return (this.state.videoContainerWidth !== videoContainer.clientWidth ||
            this.state.videoContainerHeight !== videoContainer.clientHeight);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isMobile)
      this.updateSize();
  }

  updateSize() {
    let videoContainer = findDOMNode(this.refs.videoContainer),
        video = findDOMNode(this.refs.video),
        w1 = videoContainer.clientWidth,
        h1 = videoContainer.clientHeight,
        w2 = video.videoWidth || 640,
        h2 = video.videoHeight || 480;

    this.setState({videoContainerWidth: w1, videoContainerHeight: h1})

    let bounds = coverBounds(w1, h1, w2, h2, 'px');

    video.style.width = bounds.width;
    video.style.height = bounds.height;
    video.style.marginTop = bounds.top;
    video.style.marginLeft = bounds.left;
  }

  render() {
    let styles = {
      videoContainer: {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      },
      video: {
        display: 'block'
      }
    };

    return (
      <div ref="videoContainer" style={styles.videoContainer}>
        {!this.props.isMobile ? (
          <video ref="video" autoPlay loop style={styles.video}>
            <source src={this.props.src} type="video/mp4"/>
          </video>
        ) : ''}
      </div>
    );
  }

}

Video.defaultProps = {
  src: '',
  poster: '',
  isMobile: true,
  onReady: null
}

Video.propTypes = {
  src: React.PropTypes.string,
  poster: React.PropTypes.string,
  isMobile: React.PropTypes.bool,
  onReady: React.PropTypes.func
}

export default Video;
