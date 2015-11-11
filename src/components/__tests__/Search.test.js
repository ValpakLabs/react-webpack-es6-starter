global.reactModulesToStub = ['Icon.js'];

import Search from '../Search';

const sim = TestUtils.Simulate;

describe('A search component', function() {

  it('should have an input field', function () {
    let search = renderSearch();
    expect(inputNode(search)).to.not.be.null;
  }); 

  it('should have a submit button', function () {
    let search = renderSearch();
    expect(submitNode(search)).to.not.be.null;
  });

  it('should render passed in children', function () {
    let search = TestUtils.renderIntoDocument(<Search><p>I'm a search child</p></Search>);
    expect(node(search).querySelector('p')).to.not.be.null;
  });

  it('should call onFocus callback onFocus', function () {
    let onFocusSpy = sinon.spy();
    let search = renderSearch({onFocus: onFocusSpy});

    sim.focus(node(search));
    expect(onFocusSpy).to.have.been.called;
  });

  it('should call onBlur callback onBlur', function () {
    let onBlurSpy = sinon.spy();
    let search = renderSearch({onBlur: onBlurSpy});

    sim.blur(node(search));
    expect(onBlurSpy).to.have.been.called;
  });

  it('should call onChange callback with entered text when input changes', function () {
    let onChangeSpy = sinon.spy();
    let search = renderSearch({onChange: onChangeSpy});

    sim.change(inputNode(search), {target: {value: 'Hello, world'}});
    expect(onChangeSpy).to.have.been.calledWith('Hello, world');
  });

  it('should call onSubmit callback with query text when submitted', function () {
    let onSubmitSpy = sinon.spy();
    let search = renderSearch({onSubmit: onSubmitSpy});

    inputNode(search).value = 'target coupons'
    sim.touchTap(submitNode(search));
    expect(onSubmitSpy).to.have.been.calledWith('target coupons');
  });

  it('should call onSubmit callback when pressing enter key while focus', function () {
    let onSubmitSpy = sinon.spy();
    let search = renderSearch({onSubmit: onSubmitSpy});

    inputNode(search).value = 'target coupons';
    sim.keyUp(node(search), {keyCode: 13});
    expect(onSubmitSpy).to.have.been.called;
  });

  it('should not call onSubmit callback when input is empty', function () {
    let onSubmitSpy = sinon.spy();
    let search = renderSearch({onSubmit: onSubmitSpy});

    sim.touchTap(submitNode(search));
    expect(onSubmitSpy).to.not.have.been.called;
  });

  it('should not call onBlur or onFocus when focusing/blurring between input and submit', function () {
    let onFocusSpy = sinon.spy();
    let onBlurSpy = sinon.spy();
    let search = renderSearch({onFocus: onFocusSpy, onBlur: onBlurSpy});
    let inputEl = inputNode(search);
    let submitEl = submitNode(search);

    sim.focus(inputEl, {relatedTarget: submitEl});
    sim.focus(submitEl, {relatedTarget: inputEl});
    sim.blur(inputEl, {relatedTarget: submitEl});
    sim.blur(submitEl, {relatedTarget: inputEl});
    expect(onFocusSpy).to.not.have.been.called;
    expect(onBlurSpy).to.not.have.been.called;
  });

});

//////////////////////////

function renderSearch(props) {
  return TestUtils.renderIntoDocument(<Search {...props}/>);
}

function inputNode(search) {
  return React.findDOMNode(search.refs.input)
}

function submitNode(search) {
  return React.findDOMNode(search.refs.submit)
}

function node(component) {
  return React.findDOMNode(component)
}