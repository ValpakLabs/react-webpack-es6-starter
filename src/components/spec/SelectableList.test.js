import SelectableList from '../SelectableList';

const mockItems = [
  {
    value: 'mrossman',
    label: 'Michael Rossman'
  },
  {
    value: 'drossman',
    label: 'Darek Rossman'
  }
];

describe.only('A SelectableList component', function() {

  it('should have default props', () => {
    let c = TestUtils.renderIntoDocument(<SelectableList />);

    expect(c.props.selectedIndex).to.be.null;
    expect(c.props.items).to.be.a("array");
    expect(c.props.items.length).to.equal(0);
    expect(c.props.onItemSelected).to.be.null;
  });

  context('Given an array of item objects', () => {
    it('should render each item as a list element with the correct label', () => {
      let c = TestUtils.renderIntoDocument(<SelectableList items={mockItems}/>);
      let node = React.findDOMNode(c);
      let itemNodes = node.querySelectorAll('li');

      expect(itemNodes.length).to.equal(2);
    });
  })

});