import Grid from '../Grid';

describe('A Grid component', function() {
  
  it('should have default props', function () {
    var c = TestUtils.renderIntoDocument(<Grid />)  
    expect(c.props.cols).to.equal(1);
    expect(c.props.gutter).to.equal(1/12);
    expect(c.props.rowGutter).to.equal(1/12);
  });

});