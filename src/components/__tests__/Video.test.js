
import Video from '../Video';

describe('A Video component', function() {

  let updateSizeSpy;

  beforeEach(function () {
    updateSizeSpy = sinon.spy(Video.prototype, 'updateSize');
  });

  afterEach(function () {
    Video.prototype.updateSize.restore();
  });

  it('should have default props', function () {
    let video = TestUtils.renderIntoDocument(<Video />);
    expect(video.props.src).to.equal('');
    expect(video.props.poster).to.equal('');
    expect(video.props.isMobile).to.be.true;
    expect(video.props.onReady).to.be.null;
  });

  context('Given isMobile prop is true', function() {

    it('should not render the video element', function () {
      let video = render(<Video/>);
      expect(findNode(video.refs.video)).to.be.null;
    }); 

    it('should set the poster image as the container\'s background', function () {
      let video = render(<Video poster="image.png"/>);
      expect(findNode(video.refs.videoContainer).style.backgroundImage).to.equal('url(image.png)');
    });

    it('should set state loaded state to true and call the onReady callback once', function () {
      let onReadySpy = sinon.spy();
      let video = render(<Video onReady={onReadySpy}/>);

      expect(video.state.loaded).to.be.true;

      return Promise.resolve(function(){
        setTimeout(() => {
          // component calls onReady after 200ms delay to
          // allow image time to load (just a jsdom hack really)
          expect(onReadySpy).to.have.been.called;
        }, 200)
      })
    });

  });

  context('Given isMobile is false', function() {

    it('should render a video element', function () {
      let video = render(<Video isMobile={false} />);
      let videoElement = findNode(video.refs.video);
      expect(videoElement).to.not.be.null;
    });

    it('should update the video dimensions when video is loaded', function () {
      let video = render(<Video isMobile={false} />);
      let videoEl = findNode(video.refs.video);
      
      emit(videoEl, 'loadeddata');
      expect(updateSizeSpy).to.have.been.called;
    });

    it('should call the onReady callback when video is loaded', function () {
      let onReadySpy = sinon.spy();
      let video = render(<Video isMobile={false} onReady={onReadySpy}/>);
      let videoEl = findNode(video.refs.video);
      
      emit(videoEl, 'loadeddata');
      expect(onReadySpy).to.have.been.called;
    });

    it('should set loaded state to true when video is loaded', function () {
      let video = render(<Video isMobile={false} />);
      let videoEl = findNode(video.refs.video);
      
      emit(videoEl, 'loadeddata');
      expect(video.state.loaded).to.be.true;
    });

  });
 
});

//////////////////////////

function render(component) {
  return TestUtils.renderIntoDocument(component);
}

function findNode(ref) {
  return React.findDOMNode(ref);
}

function emit(el, eventName) {
  var evt = document.createEvent('Event');
  evt.initEvent(eventName, true, true, null);
  el.dispatchEvent(evt)
}