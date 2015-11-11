import CouponCard from '../CouponCard';

// JSDOM does not implement getComputedStyle()
global.getComputedStyle = function() {
  return {'line-height': '24px'}
}

describe('A CouponCard component', function() {
  it('should have default props', function() {
    let c = TestUtils.renderIntoDocument(<CouponCard />);

    expect(c.props.type).to.equal('local');
    expect(c.props.title).to.equal('Offer Title');
    expect(c.props.description).to.equal('');
    expect(c.props.logoUrl).to.be.null;
    expect(c.props.bannerUrl).to.be.null;
    expect(c.props.offerUrl).to.be.null;
    
    expect(c.props.onPrimaryAction).to.be.a('function');
    expect(c.props.onSecondaryAction).to.be.a('function');
  });

  it('should render a Card component', function () {
    let c = TestUtils.renderIntoDocument(<CouponCard />);
    expect(c.refs.card).to.be.defined;
  });
})