import AutoSuggest from '../AutoSuggest';

describe('An AutoSuggest component', function() {

  it('should have default props', function() {
    let c = TestUtils.renderIntoDocument(<AutoSuggest />);
    
    expect(c.props.term).to.equal('');
    expect(c.props.url).to.equal('https://vpdev.valpak.com/pub/auto/name/businessname');
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
        let c = TestUtils.renderIntoDocument(<AutoSuggest term="koh" onResponse={responseSpy}/>);
      }).then(function(){
        expect(responseSpy).to.have.been.calledWith([{businessName: 'fake biz'}]);
      })
    }); 

    it('should call onError callback on failed server request', function () {
      let errorSpy; 

      return new Promise(function(resolve, reject) {
        errorSpy = sinon.spy(function(err) {
          resolve();
        });
        let c = TestUtils.renderIntoDocument(
          <AutoSuggest term="koh" url="badurl" onError={errorSpy}/>
        );
      }).then(function(){
        expect(errorSpy).to.have.been.called;
      })
    });
  
  });

});