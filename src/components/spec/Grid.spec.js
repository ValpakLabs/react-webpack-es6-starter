import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Grid from '../Grid';

function render(props = {}, childCount = 6) {
  return TestUtils.renderIntoDocument(
    <Grid style={{width: 320}} {...props}>
      {Array.from(Array(childCount).keys()).map(i => <div key={i}/>)}
    </Grid>
  );
}

describe('Component: Grid', () => {
  it('should render stack layout for default props', () => {
    let grid = render();
    expect(grid.refs['grid_item_0'].style.width).toEqual('320px');
    expect(grid.refs['grid_item_1'].style.width).toEqual('320px');
    expect(grid.refs['grid_item_2'].style.width).toEqual('320px');
    expect(grid.refs['grid_item_3'].style.width).toEqual('320px');
    expect(grid.refs['grid_item_4'].style.width).toEqual('320px');
    expect(grid.refs['grid_item_5'].style.width).toEqual('320px');
  });

  it('should render a layout array for given viewport size', () => {
    let grid = render({
      layout: {
        lg: [
          [0, 0, 4, 4],
          [4, 0, 4, 4],
          [8, 0, 4, 4],
          [0, 4, 4, 4],
          [4, 4, 4, 4],
          [8, 4, 4, 4]
        ]
      },
      viewportSize: 'lg',
      width: 1024
    });

    expect(grid.refs['grid_item_0'].style.width).toEqual('340px');
    expect(grid.refs['grid_item_1'].style.width).toEqual('340px');
    expect(grid.refs['grid_item_2'].style.width).toEqual('340px');
    expect(grid.refs['grid_item_3'].style.width).toEqual('340px');
    expect(grid.refs['grid_item_4'].style.width).toEqual('340px');
    expect(grid.refs['grid_item_5'].style.width).toEqual('340px');
    expect(grid.refs['grid_item_0'].style.height).toEqual('334px');
    expect(grid.refs['grid_item_1'].style.height).toEqual('334px');
    expect(grid.refs['grid_item_2'].style.height).toEqual('334px');
    expect(grid.refs['grid_item_3'].style.height).toEqual('334px');
    expect(grid.refs['grid_item_4'].style.height).toEqual('334px');
    expect(grid.refs['grid_item_5'].style.height).toEqual('334px');
    expect(grid.refs['grid_item_0'].style.transform).toEqual('translate(1px, 1px)');
    expect(grid.refs['grid_item_1'].style.transform).toEqual('translate(343px, 1px)');
    expect(grid.refs['grid_item_2'].style.transform).toEqual('translate(685px, 1px)');
    expect(grid.refs['grid_item_3'].style.transform).toEqual('translate(1px, 337px)');
    expect(grid.refs['grid_item_4'].style.transform).toEqual('translate(343px, 337px)');
    expect(grid.refs['grid_item_5'].style.transform).toEqual('translate(685px, 337px)');
  });

});
