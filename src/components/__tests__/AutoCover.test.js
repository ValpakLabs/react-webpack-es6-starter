import AutoCover from '../AutoCover';

describe('An AutoCover component', function () {
  
  let updateChildSizeSpy;

  beforeEach(function () {
    updateChildSizeSpy = sinon.spy(AutoCover.prototype, 'updateChildSize'); 
  });

  afterEach(function () {
    AutoCover.prototype.updateChildSize.restore()
  });

  it('should have default props', function() {
    let c = TestUtils.renderIntoDocument(<AutoCover />);
    let props = c.props;
    expect(props.center).to.be.true;
    expect(props.fit).to.be.false;
  });

  it('should render an element with a content ref and provided child element', function() {
    let c = TestUtils.renderIntoDocument(<AutoCover><img src=""/></AutoCover>);
    let contentNode = React.findDOMNode(c.refs.content);

    expect(contentNode).to.not.be.null;
    expect(contentNode.querySelector('img')).to.not.be.null;
  });

  it('should clone the child element and add a media ref', function () {
    let c = TestUtils.renderIntoDocument(<AutoCover><img src=""/></AutoCover>);
    expect(React.findDOMNode(c.refs.media)).to.not.be.null;
  });

  it('should set child size and position when media loads', function () {
    let c = TestUtils.renderIntoDocument(<AutoCover><img src=""/></AutoCover>);

    emit(React.findDOMNode(c.refs.media), 'load');
    expect(updateChildSizeSpy).to.have.been.called;
  });

});

function emit(el, eventName) {
  var evt = document.createEvent('Event');
  evt.initEvent(eventName, true, true, null);
  el.dispatchEvent(evt)
}