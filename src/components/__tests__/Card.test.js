global.reactModulesToStub = [
  'AutoCover.js'
];

import Card from '../Card';

describe('A Card component', function() {

  it('should have default props', function () {
    var card = TestUtils.renderIntoDocument(<Card/>);

    expect(card.props.type).to.equal('feature');
    expect(card.props.bannerImgSrc).to.equal('');
    expect(card.props.badgeImgSrc).to.equal('');
    expect(card.props.primaryBtnText).to.equal('Primary');
    expect(card.props.secondaryBtnText).to.equal('Secondary');
    expect(card.props.bannerHeight).to.equal(100);
    expect(card.props.bannerPadding).to.equal(0);
    expect(card.props.cardHeight).to.equal(200);

    expect(card.props.onPrimaryBtnTap).to.be.a('function');
    expect(card.props.onSecondaryBtnTap).to.be.a('function');
    expect(card.props.onTouchTap).to.be.a('function');
  });

  it('should render a DOM element with class name `Card`', function() {
    var card = TestUtils.renderIntoDocument(<Card/>);
    var cardNode = React.findDOMNode(card);

    expect(cardNode).to.not.be.null;
    expect(cardNode.classList.contains('Card')).to.be.true;
  });

  it('should render a banner element with class name `Card__banner`', function() {
    var card = TestUtils.renderIntoDocument(<Card/>);
    var bannerNode = React.findDOMNode(card.refs.banner);

    expect(bannerNode).to.not.be.null;
    expect(bannerNode.classList.contains('Card__banner')).to.be.true;
  });

  it('should render a banner image with given src prop', function() {
    var card = TestUtils.renderIntoDocument(<Card bannerImgSrc="http://www.valpak.com/img.png" />);
    var bannerNode = React.findDOMNode(card.refs.banner);

    expect(bannerNode.querySelector('img').src).to.equal('http://www.valpak.com/img.png');
  });

  it('should render a badge image only when given badgeImgSrc prop', function() {
    var card = TestUtils.renderIntoDocument(<Card badgeImgSrc="http://www.valpak.com/img.png" />);
    var badgeNode = React.findDOMNode(card.refs.badge);
    expect(badgeNode.querySelector('img').src).to.equal('http://www.valpak.com/img.png');

    card = TestUtils.renderIntoDocument(<Card />);
    badgeNode = React.findDOMNode(card.refs.badge);
    expect(badgeNode).to.be.null;
  });

  it('should render a content element with passed in children', function () {
    var card = TestUtils.renderIntoDocument(<Card><p>Hello</p></Card>);
    var contentNode = React.findDOMNode(card.refs.content);

    expect(contentNode.querySelector('p').innerHTML).to.equal('Hello');
  });

  it('should call primary button callback when tapped', function() {
    var onPrimaryBtnTapSpy = sinon.spy();
    var card = TestUtils.renderIntoDocument(<Card onPrimaryBtnTap={onPrimaryBtnTapSpy} />);
    var btnNode = React.findDOMNode(card.refs.primaryBtn);
    TestUtils.Simulate.touchTap(btnNode, {});

    expect(onPrimaryBtnTapSpy).to.have.been.called;
  });

  it('should not call onTouchTap callback when tapping primary or secondary buttons', function() {
    var onBtnTapSpy = sinon.spy();
    var onTouchTapSpy = sinon.spy();
    var card = TestUtils.renderIntoDocument(
      <Card onPrimaryBtnTap={onBtnTapSpy} onSecondaryBtnTap={onBtnTapSpy} onTouchTap={onTouchTapSpy}/>
    );
    
    TestUtils.Simulate.touchTap(React.findDOMNode(card.refs.primaryBtn), {});
    TestUtils.Simulate.touchTap(React.findDOMNode(card.refs.secondaryBtn), {});
    
    expect(onBtnTapSpy).to.have.been.called;
    expect(onTouchTapSpy).to.not.have.been.called;
  });

  it('should call secondary button callback when tapped', function() {
    var onSecondaryButtonTapSpy = sinon.spy();
    var card = TestUtils.renderIntoDocument(<Card onSecondaryBtnTap={onSecondaryButtonTapSpy} />);
    var btnNode = React.findDOMNode(card.refs.secondaryBtn);
    TestUtils.Simulate.touchTap(btnNode, {});

    expect(onSecondaryButtonTapSpy).to.have.been.called;
  });

  it('should call onTouchTap callback when tapped anywhere', function() {
    var onTouchTapSpy = sinon.spy();
    var card = TestUtils.renderIntoDocument(<Card onTouchTap={onTouchTapSpy} />);
    var cardNode = React.findDOMNode(card);

    TestUtils.Simulate.touchTap(cardNode, {});
    expect(onTouchTapSpy).to.have.been.called;
  });

});

//////////////////////////
