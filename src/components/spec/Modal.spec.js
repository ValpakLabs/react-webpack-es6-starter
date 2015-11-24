import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Modal from '../Modal';

let node = document.createElement('div');

function render(props = {}) {
  return ReactDOM.render(<Modal {...props}/>, node);
}

describe('Component: Modal', () => {

  beforeEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it('should have default props', () => {
    let c = render();
    expect(c.props.show).toBe(false);
    expect(c.props.closeDelay).toBe(200);
    expect(c.props.scaleBounce).toBe(0.9);
    expect(c.props.startY).toBe(-50);
    expect(c.props.closeOnOuterClick).toBe(true);
    expect(c.props.onClose).toBeA(Function);
  });

  it('should not render anything initially', () => {
    let c = render();
    expect(c.refs).toEqual({});
  });

  it('should unhide itself before transitioning in', (done) => {
    let c = render({show: true});
    let wrapper = c.refs.motion.refs.wrapper;
    expect(wrapper.style.display).toEqual('block');
    expect(c.state.hidden).toBe(false);
    expect(c.state.leaving).toBe(true);
    setTimeout(() => {
      expect(c.state.hidden).toBe(false);
      expect(c.state.leaving).toBe(false);
      done();
    });
  });

  it('should show and hide on prop change w/ delay', (done) => {
    let c = render();
    render({show: true});
    let wrapper = c.refs.motion.refs.wrapper;
    expect(c.state.hidden).toBe(false);
    setTimeout(() => {
      expect(c.state.leaving).toBe(false);
      render({show: false});
      expect(c.state.leaving).toBe(true);
      expect(c.state.hidden).toBe(false);
      setTimeout(() => {
        expect(c.state.hidden).toBe(true);
        done();
      }, c.props.closeDelay);
    });
  });

  it('should render passed-in children', () => {
    let c = render({show: true, children: <div>Hello</div>});
    let wrapper = c.refs.motion.refs.wrapper;
    expect(wrapper.children[1].children[0].textContent).toEqual('Hello');
  });

  it('should call onClose prop when closed', (done) => {
    let c = render({show: true});
    render({show: false, onClose: expect.createSpy()});
    setTimeout(() => {
      expect(c.props.onClose).toHaveBeenCalled();
      done();
    }, c.props.closeDelay);
  });

  it('should close when backdrop is clicked', (done) => {
    let c = render({show: true});
    setTimeout(() => {
      let wrapper = c.refs.motion.refs.wrapper;
      TestUtils.Simulate.click(wrapper.children[0]);
      setTimeout(() => {
        expect(c.state.hidden).toBe(true);
        done();
      }, c.props.closeDelay);
    });
  });

});
