// global.reactModulesToStub = [
//   'Page.js',
//   'WecomePage.js'
// ];

import App from '../App';

describe.skip('An App component', function() {
  let app; 
  let setScreenTypeSpy;

  beforeEach(function () {
    setScreenTypeSpy = sinon.spy(App.prototype, 'setScreenType'); 
  });

  afterEach(function () {
    App.prototype.setScreenType.restore()
  });

  context('Given a DOM with a viewport and a device` context', function() {

    it('should render with className `App`', function () {
      app = TestUtils.renderIntoDocument(<App/>);
      expect(React.findDOMNode(app).classList.contains('App')).to.be.true;
    });

    it('should set screen state to `handheld` up to 480px', function () {
      app = renderAppAtWidth(480);

      return waitForDebounce().then(function(){
        expect(setScreenTypeSpy.callCount).to.equal(1)
        expect(app.state.screenType).to.equal('handheld');
      })
    });

    it('should set screen state to `tablet` from 481px to 959px', function () {
      
      app = renderAppAtWidth(481);

      return waitForDebounce().then(function(){
        expect(setScreenTypeSpy.callCount).to.equal(1)
        expect(app.state.screenType).to.equal('tablet');
      }).then(function(){
        app = renderAppAtWidth(959);
        return waitForDebounce()
      }).then(function(){
        expect(setScreenTypeSpy.callCount).to.equal(2)
        expect(app.state.screenType).to.equal('tablet');
      })
    });

    it('should set screen state to `desktop` over 959px', function () {
      let app = renderAppAtWidth(960);
      return waitForDebounce().then(function(){
        expect(setScreenTypeSpy.callCount).to.equal(1)
        expect(app.state.screenType).to.equal('desktop');
      })
    });

    it('should change state when window is resized between thresholds', function () {
      app = renderAppAtWidth(375);

      return resizeWindow(600).then(function(){
        expect(app.state.screenType).to.equal('tablet');
        return resizeWindow(1600);
      }).then(function(){
        expect(app.state.screenType).to.equal('desktop');
        return resizeWindow(300);
      }).then(function(){
        expect(app.state.screenType).to.equal('handheld');
      });
      
    });

    it('should have the `App` modifier classes for each breakpoint', function() {
      app = renderAppAtWidth(375);
      
      return waitForDebounce().then(function() {
        expect(React.findDOMNode(app).classList.contains('App--handheld')).to.be.true;
        app = renderAppAtWidth(600);
        return waitForDebounce();
      }).then(function() {
        expect(React.findDOMNode(app).classList.contains('App--tablet')).to.be.true;
        app = renderAppAtWidth(1200);
        return waitForDebounce();
      }).then(function() {
        expect(React.findDOMNode(app).classList.contains('App--desktop')).to.be.true;
      })
    });

  });
 
});

//////////////////////////

function renderAppAtWidth(width=1200) {
  /**
   * NOTE: Faking window.innerWidth does not work in Firefox.
   */
  window.innerWidth = width;
  return TestUtils.renderIntoDocument(<App resizeDelay={5}/>);
}

function emit(el, eventName) {
  var evt = document.createEvent('Event');
  evt.initEvent(eventName, true, true, null);
  el.dispatchEvent(evt)
}

function resizeWindow(toWidth, waitMS) {
  return new Promise(function(resolve, reject) {
    window.innerWidth = toWidth;
    emit(window, 'resize');
    return setTimeout(resolve, waitMS || 10);
  })
}

function waitForDebounce(time) {
  return new Promise((resolve, reject) => {
    return setTimeout(resolve, time || 10);
  })
}