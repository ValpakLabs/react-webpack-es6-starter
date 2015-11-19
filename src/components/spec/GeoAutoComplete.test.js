import GeoAutoComplete from '../GeoAutoComplete';

describe('A GeoAutoComplete component', function() {

  it('should have default props', function() {
    let c = TestUtils.renderIntoDocument(<GeoAutoComplete />);
    
    expect(c.props.term).to.equal('');
    expect(c.props.url).to.equal('https://vpdev.valpak.com/pub/auto/geo/cities');
    expect(c.props.itemCount).to.equal(5);
    expect(c.props.onResponse).to.be.a('function');
    expect(c.props.onError).to.be.a('function');
  });

  context('Given a term prop', function() {
    
    it('should call onResponse callback with business name suggestions from server', function() {
      let responseSpy;

      return new Promise(function(resolve, reject) {
        responseSpy = sinon.spy(function(res) {
          resolve();
        });
        let c = TestUtils.renderIntoDocument(<GeoAutoComplete term="koh" onResponse={responseSpy}/>);
      }).then(function(){
        expect(responseSpy).to.have.been.calledWith([{
          "city" : "Tampa",
          "state" : "FL"
        }]);
      })
    }); 

    it('should call onError callback on failed server request', function () {
      let errorSpy; 

      return new Promise(function(resolve, reject) {
        errorSpy = sinon.spy(function(err) {
          resolve();
        });
        let c = TestUtils.renderIntoDocument(
          <GeoAutoComplete term="koh" url="badurl" onError={errorSpy}/>
        );
      }).then(function(){
        expect(errorSpy).to.have.been.called;
      })
    });
  
  });

  context('Given a suggested geography returned from server', function() {
    it('should set returned results to state', function () {
      let responseSpy;
      let c;

      return new Promise(function(resolve, reject) {
        responseSpy = sinon.spy(function(res) {
          resolve();
        });
        c = TestUtils.renderIntoDocument(<GeoAutoComplete term="tam" onResponse={responseSpy}/>);
      }).then(function(){
        expect(c.state.geoResults).to.deep.equal([{
          "city" : "Tampa",
          "state" : "FL"
        }])
      })
    });

    it('should set render an element to display results', function () {
      let responseSpy;
      let c;

      return new Promise(function(resolve, reject) {
        responseSpy = sinon.spy(function(res) {
          resolve();
        });
        c = TestUtils.renderIntoDocument(<GeoAutoComplete term="tam" onResponse={responseSpy}/>);
      }).then(function(){
        expect(React.findDOMNode(c.refs.geoResultsList)).to.not.be.null;
      })
    });
  })

});