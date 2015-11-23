import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import SearchSuggest from '../SearchSuggest';
import SelectableList from '../SelectableList';

let node = document.createElement('div');

function render(props = {}) {
  return ReactDOM.render(<SearchSuggest {...props}/>, node);
}

const mockSuggestionList = [
  {businessName: 'foo'},
  {businessName: 'bar'},
  {businessName: 'baz'}
];

describe('Component: SearchSuggest', () => {

  beforeEach(() => {
    ReactDOM.unmountComponentAtNode(node);
    global.fetch = expect.createSpy().andReturn(
      Promise.resolve({
        json: () => Promise.resolve(mockSuggestionList)
      })
    );
  });

  it('should fetch suggestions from server', () => {
    let c = render({term: 'foo'});
    expect(fetch).toHaveBeenCalledWith(`${c.props.url}?term=${c.props.term}&count=${c.props.itemCount}&geo=${c.props.geo}`);
  });

  it('should handle suggestions from server', (done) => {
    let c = render({term: 'foo', onFetch: expect.createSpy()});
    expect.spyOn(c, 'handleResponse').andCallThrough();
    setTimeout(() => {
      expect(c.handleResponse).toHaveBeenCalledWith(mockSuggestionList);
      expect(c.props.onFetch).toHaveBeenCalledWith(mockSuggestionList);
      done();
    });
  });

  it('should handle error from server', (done) => {
    global.fetch = expect.createSpy().andReturn(Promise.reject('server error'));
    let c = render({term: 'foo', onError: expect.createSpy()});
    expect.spyOn(c, 'handleError').andCallThrough();
    setTimeout(() => {
      expect(c.handleError).toHaveBeenCalledWith('server error');
      expect(c.props.onError).toHaveBeenCalledWith('server error');
      done();
    });
  });

  it('should handle parse error from server response', (done) => {
    global.fetch = expect.createSpy().andReturn(
      Promise.resolve({
        json: () => Promise.reject('parse error')
      })
    );
    let c = render({term: 'foo', onError: expect.createSpy()});
    expect.spyOn(c, 'handleError').andCallThrough();

    setTimeout(() => {
      expect(c.handleError).toHaveBeenCalledWith('parse error');
      expect(c.props.onError).toHaveBeenCalledWith('parse error');
      done();
    });
  });

  it('should not render with no search term', (done) => {
    let c = render();
    setTimeout(() => {
      expect(c.refs.suggestionList).toNotExist();
      done();
    });
  });

  it('should render list of suggestions', (done) => {
    let c = render({term: 'foo'});
    setTimeout(() => {
      expect(c.refs.suggestionList).toExist();
      expect(c.refs.suggestionList.children[0].children.length).toBe(3);
      done();
    });
  });

  it('should handle focusing next/prev suggestion', (done) => {
    let c = render({term: 'foo', onSuggestionFocus: expect.createSpy()});
    expect.spyOn(c, 'handleIndexChange').andCallThrough();
    setTimeout(() => {
      c.next();
      expect(c.handleIndexChange).toHaveBeenCalledWith(0);
      expect(c.props.onSuggestionFocus).toHaveBeenCalledWith(mockSuggestionList[0]);

      c.next();
      expect(c.handleIndexChange).toHaveBeenCalledWith(1);
      expect(c.props.onSuggestionFocus).toHaveBeenCalledWith(mockSuggestionList[1]);

      c.prev();
      expect(c.handleIndexChange).toHaveBeenCalledWith(0);
      expect(c.props.onSuggestionFocus).toHaveBeenCalledWith(mockSuggestionList[0]);
      done();
    });
  });

  it('should handle selecting suggestion', (done) => {
    let c = render({term: 'foo', onSuggestionSelection: expect.createSpy()});
    expect.spyOn(c, 'handleSuggestionSelection').andCallThrough();
    setTimeout(() => {
      let list = TestUtils.findRenderedComponentWithType(c, SelectableList);
      list.props.onItemSelected(0, mockSuggestionList[0]);
      expect(c.handleSuggestionSelection).toHaveBeenCalledWith(0, mockSuggestionList[0]);
      expect(c.props.onSuggestionSelection).toHaveBeenCalledWith(mockSuggestionList[0]);
      done();
    });
  });

});
