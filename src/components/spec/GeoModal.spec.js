import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import GeoModal from '../GeoModal';
import Modal from '../Modal';

function render(props = {}) {
  return TestUtils.renderIntoDocument(<GeoModal {...props}/>);
}

describe('Component: GeoModal', () => {

  it('should not render anything initially', () => {
    let c = render();
    expect(() => TestUtils.findRenderedComponentWithType(c, Modal)).toThrow(/Did not find exactly one match for componentType:function Modal/)
  });

  it('should render modal and content', () => {
    let c = render({open: true});
    expect(TestUtils.findRenderedComponentWithType(c, Modal)).toExist()
  });

  it('should handle setting geo', () => {
    let c = render({
      open: true,
      narrow: false,
      geo: {city: 'New York', state: 'NY'},
      setGeo: expect.createSpy()
    });
    c.context.closeModal = () => null;
    c.refs.autoComplete.props.onGeoSelected({city: 'Tampa', state: 'FL'});
    expect(c.props.setGeo).toHaveBeenCalledWith('Tampa,%20FL');
  });

  it('should have a button that closes modal', () => {
    let c = render({open: true});
    c.context.closeModal = expect.createSpy();
    expect.spyOn(c, 'handleCloseModal').andCallThrough();
    expect(c.refs.closeModalButton).toExist();
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(c, 'close-geo-modal')
    );
    expect(c.handleCloseModal).toHaveBeenCalledWith('geo');
    expect(c.context.closeModal).toHaveBeenCalledWith('geo');
  });

});
