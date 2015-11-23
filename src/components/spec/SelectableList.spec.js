import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import SelectableList from '../SelectableList';

function render(props = {}) {
  return TestUtils.renderIntoDocument(<SelectableList {...props}/>);
}

const mockItems = [
  {
    value: 'foo',
    label: 'Foo Man'
  },
  {
    value: 'bar',
    label: 'Bar Man'
  }
];

describe('Component: SelectableList', () => {

  it('should have default props', () => {
    let c = render();
    expect(c.props.selectedIndex).toBe(-1);
    expect(c.props.items).toEqual([]);
    expect(c.props.onItemSelected).toBeA(Function);
  });

  it('should render UL', () => {
    let c = render();
    expect(c.refs.items).toExist();
    expect(c.refs.items.nodeName).toEqual('UL');
  });

  it('should render each item', () => {
    let c = render({items: mockItems});
    expect(c.refs.items.children.length).toBe(2);
    expect(c.refs.items.children[0].innerHTML).toEqual('Foo Man');
    expect(c.refs.items.children[1].innerHTML).toEqual('Bar Man');
  });

  it('should handle clicking on item', () => {
    let c = render({items: mockItems, onItemSelected: expect.createSpy()});
    expect.spyOn(c, 'handleItemSelected').andCallThrough();
    TestUtils.Simulate.click(c.refs.items.children[0]);
    expect(c.handleItemSelected).toHaveBeenCalledWith(0, 'foo');
    expect(c.props.onItemSelected).toHaveBeenCalledWith(0, 'foo');
  });

  it('should highlight selected item with given color', () => {
    let c = render({items: mockItems, selectedColor: 'red', selectedIndex: 0});
    expect(c.refs.items.children[0].style.backgroundColor).toEqual('red');
    expect(c.refs.items.children[1].style.backgroundColor).toEqual('rgb(255, 255, 255)');
  });

});
