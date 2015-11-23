import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import GeoAutoComplete from '../GeoAutoComplete';
import SelectableList from '../SelectableList';


function render(props = {}) {
  return TestUtils.renderIntoDocument(<GeoAutoComplete {...props}/>);
}

const mockSuggestionList = [{
  city: 'New York',
  state: 'NY'
}];

describe('Component: GeoAutoComplete', function() {

  beforeEach(() =>
    global.fetch = expect.createSpy().andReturn(
      Promise.resolve({
        json: () => Promise.resolve(mockSuggestionList)
      })
    )
  );

  afterEach(() => {
    expect.restoreSpies();
  })

  it('should render geo input form', function() {
    let c = render();
    expect(c.refs.geoResultsList).toNotExist();
    expect(c.refs.geoChangeForm).toExist();
    expect(c.refs.geoInputField).toExist();
  });

  it('should handle geo input value change', () => {
    let c = render();
    expect.spyOn(c, 'handleGeoInputChange').andCallThrough();
    TestUtils.Simulate.change(c.refs.geoInputField, {target: {value: 'foo'}});
    expect(c.handleGeoInputChange).toHaveBeenCalledWith('foo');
    expect(c.state.geoSearchTerm).toBe('foo');
  });

  it('should fetch suggestions from server on input change', () => {
    let c = render();
    expect.spyOn(c, 'getSuggestions').andCallThrough();
    TestUtils.Simulate.change(c.refs.geoInputField, {target: {value: 'foo'}});
    expect(c.getSuggestions).toHaveBeenCalledWith('foo');
    expect(fetch).toHaveBeenCalledWith(`${c.props.url}?term=foo&count=${c.props.itemCount}`);
  });

  it('should handle suggestions returned from server', (done) => {
    let c = render({onResponse: expect.createSpy()});
    expect.spyOn(c, 'handleResponse').andCallThrough();
    TestUtils.Simulate.change(c.refs.geoInputField, {target: {value: 'foo'}});
    setTimeout(() => {
      expect(c.handleResponse).toHaveBeenCalledWith(mockSuggestionList);
      expect(c.props.onResponse).toHaveBeenCalledWith(mockSuggestionList);
      expect(c.state.geoResults).toBe(mockSuggestionList);
      done();
    });
  });

  it('should handle error returned from server', (done) => {
    let c = render({onError: expect.createSpy()});
    global.fetch = expect.createSpy().andReturn(
      Promise.reject('server error')
    );
    expect.spyOn(c, 'handleError').andCallThrough();
    TestUtils.Simulate.change(c.refs.geoInputField, {target: {value: 'foo'}});
    setTimeout(() => {
      expect(c.handleError).toHaveBeenCalledWith('server error');
      expect(c.props.onError).toHaveBeenCalledWith('server error');
      done();
    });
  });

  it('should handle suggestion response parsing error', (done) => {
    let c = render({onError: expect.createSpy()});
    global.fetch = expect.createSpy().andReturn(
      Promise.resolve({
        json: () => Promise.reject('response error')
      })
    );
    expect.spyOn(c, 'handleError').andCallThrough();
    TestUtils.Simulate.change(c.refs.geoInputField, {target: {value: 'foo'}});
    setTimeout(() => {
      expect(c.handleError).toHaveBeenCalledWith('response error');
      expect(c.props.onError).toHaveBeenCalledWith('response error');
      done();
    });
  });

  it('should render list of suggestions', (done) => {
    let c = render();
    TestUtils.Simulate.change(c.refs.geoInputField, {target: {value: 'foo'}});
    setTimeout(() => {
      expect(c.refs.geoResultsList).toExist();
      done();
    });
  });

  it('should handle focusing suggestion in list', () => {
    let c = render({onGeoFocus: expect.createSpy()});
    c.setState({geoResults: mockSuggestionList});
    c.next();
    expect(c.refs.geoInputField.value).toEqual('New York, NY');
    expect(c.props.onGeoFocus).toHaveBeenCalledWith(mockSuggestionList[0]);
  });

  it('should handle selecting a geo', () => {
    let c = render({onGeoSelected: expect.createSpy()});
    c.setState({geoResults: mockSuggestionList});
    let list = TestUtils.findRenderedComponentWithType(c, SelectableList)
    list.props.onItemSelected(0);
    expect(c.props.onGeoSelected).toHaveBeenCalledWith(mockSuggestionList[0]);
  });

});
