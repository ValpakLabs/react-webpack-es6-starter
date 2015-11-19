import ResponsivePage from '../ResponsivePage';

const defaultBreakpoints = {
  xl: 1440, 
  lg: 1200, 
  md: 960, 
  sm: 768, 
  xs: 568, 
  xxs: 320
};

describe('A ResponsivePage component', function () {
  it('should have default props', function () {
    var c = TestUtils.renderIntoDocument(<ResponsivePage />);

    expect(c.props.breakpoints).to.deep.equal(defaultBreakpoints);
    expect(c.props.onBreakpointChange).to.be.null;
  });
});