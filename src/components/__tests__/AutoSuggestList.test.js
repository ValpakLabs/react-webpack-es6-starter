global.reactModulesToStub = [
  'Icon.js'
];

import AutoSuggestList from '../AutoSuggestList';

let suggestedItems = [{
  "businessName" : "AT&T",
  "alias" : "ATT",
  "businessType" : "AFFILIATE",
  "offerCount" : 21,
  "logoURL" : "https://vpdev.valpak.com/img/print/MidasLogoBPP-3117.jpg",
  "bppURL" : "/printable/midas/51822?addressId=73049&offerId=1655687"
}, {
  "businessName" : "AT&T Wireless",
  "alias" : "ATT Wireless",
  "businessType" : "TOP_SEARCH",
  "offerCount" : 42,
  "logoURL" : "https://vpdev.valpak.com/img/print/MidasLogoBPP-3117.jpg",
  "bppURL" : "/printable/midas/51822?addressId=73049&offerId=1655687"
}, {
  "businessName" : "Atchley Ford",
  "alias" : "Atchley Ford",
  "businessType" : "AFFILIATE",
  "offerCount" : 1,
  "logoURL" : "https://vpdev.valpak.com/img/print/MidasLogoBPP-3117.jpg",
  "bppURL" : "/printable/midas/51822?addressId=73049&offerId=1655687"
}, {
  "businessName" : "Ateam Services",
  "alias" : "Ateam Services",
  "businessType" : "LOCAL",
  "offerCount" : 1,
  "logoURL" : "https://vpdev.valpak.com/img/print/MidasLogoBPP-3117.jpg",
  "bppURL" : "/printable/midas/51822?addressId=73049&offerId=1655687"
}];

describe('An AutoSuggestList component', function() {

  it('should have default props', function() {
    let c = TestUtils.renderIntoDocument(<AutoSuggestList />);
    expect(c.props.items).to.be.a('array');
    expect(c.props.items).to.have.length(0);
    expect(c.props.show).to.be.false;
    expect(c.props.onItemSelected).to.be.a('function');
  });

  it('should render a content element with `AutoSuggestList` classname', function () {
    let c = TestUtils.renderIntoDocument(<AutoSuggestList />);
    let contentNode = React.findDOMNode(c.refs.content);
    expect(contentNode).to.not.be.null;
    expect(contentNode.classList.contains('AutoSuggestList')).to.be.true;
  });

  it('should add className prop to content element', function () {
    let c = TestUtils.renderIntoDocument(<AutoSuggestList className="myClass"/>);
    expect(React.findDOMNode(c.refs.content).classList.contains('myClass')).to.be.true;
  });

  it('should render a list element with `AutoSuggestList__list` classname', function () {
    let c = TestUtils.renderIntoDocument(<AutoSuggestList items={suggestedItems}/>);
    let listNode = React.findDOMNode(c.refs.itemList);
    expect(listNode).to.not.be.null;
    expect(listNode.classList.contains('AutoSuggestList__list')).to.be.true;
  });

  it('should render suggested items in list, each with `AutoSuggestList__list__item` classname', function () {
    let c = TestUtils.renderIntoDocument(<AutoSuggestList items={suggestedItems}/>);
    let listNode = React.findDOMNode(c.refs.itemList);
    let itemNodes = listNode.querySelectorAll('.AutoSuggestList__list__item');
    expect(itemNodes.length).to.equal(4);
  });

  it('should render a logo element with `AutoSuggestList__list__item__logo` classname in each item', function () {
    let c = TestUtils.renderIntoDocument(<AutoSuggestList items={suggestedItems}/>);
    let listNode = React.findDOMNode(c.refs.itemList);
    let itemNode = listNode.querySelectorAll('.AutoSuggestList__list__item')[0];
    let itemLogoNode = itemNode.querySelector('.AutoSuggestList__list__item__logo');
    expect(itemLogoNode).to.not.be.null;
  });

  it('should split and sort suggested results items into sections with `AutoSuggestList__list__section` classnames based on business type', function () {
    let c = TestUtils.renderIntoDocument(<AutoSuggestList items={suggestedItems}/>);
    let listNode = React.findDOMNode(c.refs.itemList);
    let sectionNodes = listNode.querySelectorAll('.AutoSuggestList__list__section');
    expect(sectionNodes.length).to.equal(3);
  });

  it('should call onItemSelected callback when tapping a suggestion item', function () {
    let onItemSelectedSpy = sinon.spy();
    let c = TestUtils.renderIntoDocument(<AutoSuggestList items={suggestedItems} onItemSelected={onItemSelectedSpy}/>);
    let listNode = React.findDOMNode(c.refs.itemList);
    let itemNode = listNode.querySelectorAll('.AutoSuggestList__list__item')[0];

    TestUtils.Simulate.touchTap(itemNode);
    expect(onItemSelectedSpy).to.have.been.calledWith(suggestedItems[0]);
  });

});