import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Search from '../Search';

let next = expect.createSpy();
let prev = expect.createSpy();
let selectSuggestion = expect.createSpy();

const SearchSuggest = React.createClass({
  render: () => {
    return <div/>;
  },

  next: next,
  prev: prev,
  selectSuggestion: selectSuggestion
});

Search.__Rewire__('SearchSuggest', SearchSuggest);

function render(props) {
  return TestUtils.renderIntoDocument(<Search {...props} />);
}

describe('Component: Search', function() {
  it('should render a form and input element', () => {
    let c = render();
    expect(c.refs.form).toExist();
    expect(c.refs.input).toExist();
  });

  it('should render a submit button when not narrow', () => {
    let c = render();
    expect(c.refs.submit).toNotExist();
    c = render({narrow: false});
    expect(c.refs.submit).toExist();
  });

  it('should maintain `hasFocus` state', () => {
    let c = render();
    expect(c.state.hasFocus).toBe(false);
    TestUtils.Simulate.focus(c.refs.input);
    expect(c.state.hasFocus).toBe(true);
  });

  it('should render SearchSuggest only when focused', () => {
    let c = render();
    expect(c.refs.suggestions).toNotExist();
    TestUtils.Simulate.focus(c.refs.input);
    expect(c.refs.suggestions).toExist();
  });

  it('should delay blurring by 100ms', (done) => {
    let c = render();
    TestUtils.Simulate.focus(c.refs.input);
    expect(c.state.hasFocus).toBe(true);
    TestUtils.Simulate.blur(c.refs.input);
    expect(c.state.hasFocus).toBe(true);
    setTimeout(() => {
      expect(c.state.hasFocus).toBe(false);
      done();
    }, 100);
  });

  it('should handle text input change and save to state', () => {
    let c = render({onChange: expect.createSpy()});
    expect.spyOn(c, 'handleInputChange').andCallThrough();
    expect(c.refs.input.value).toEqual('');
    expect(c.state.term).toEqual('');
    TestUtils.Simulate.change(c.refs.input, {target: {value: 'foobar'}});
    expect(c.handleInputChange).toHaveBeenCalled();
    expect(c.props.onChange).toHaveBeenCalled();
    expect(c.state.term).toEqual('foobar');
  });

  it('should handle down arrow press', () => {
    let c = render();
    TestUtils.Simulate.focus(c.refs.input);

    // expect.spyOn(c.refs.suggestions, 'next');
    TestUtils.Simulate.keyUp(c.refs.input, {keyCode: 40});
    expect(next).toHaveBeenCalled();
  });

  it('should handle up arrow press', () => {
    let c = render();
    TestUtils.Simulate.focus(c.refs.input);

    // expect.spyOn(c.refs.suggestions, 'prev');
    TestUtils.Simulate.keyUp(c.refs.input, {keyCode: 38});
    expect(prev).toHaveBeenCalled();
  });

  it('should handle suggestions focus', () => {
    let c = render();
    expect.spyOn(c, 'handleSuggestionFocus');
    TestUtils.Simulate.focus(c.refs.input);
    c.refs.suggestions.props.onSuggestionFocus('foo');
    expect(c.handleSuggestionFocus).toHaveBeenCalledWith('foo');
  });

  it('should handle suggestion selection', () => {
    let c = render();
    expect.spyOn(c, 'handleSuggestionSelection');
    TestUtils.Simulate.focus(c.refs.input);
    c.refs.suggestions.props.onSuggestionSelection();
    expect(c.handleSuggestionSelection).toHaveBeenCalled();
  });

  it('should select suggestion on enter key press', () => {
    let c = render();
    expect.spyOn(c, 'handleSuggestionSelection');
    TestUtils.Simulate.focus(c.refs.input);
    TestUtils.Simulate.keyUp(c.refs.input, {keyCode: 13});
    expect(selectSuggestion).toHaveBeenCalled();
    c.refs.suggestions.props.onSuggestionSelection('foo');
    expect(c.handleSuggestionSelection).toHaveBeenCalledWith('foo');
  });

  it('should submit input term when no suggestion', () => {
    let c = render({onSubmit: expect.createSpy()});
    expect.spyOn(c, 'handleSubmit').andCallThrough();
    TestUtils.Simulate.focus(c.refs.input);
    TestUtils.Simulate.change(c.refs.input, {target: {value: 'poobah'}});
    c.refs.suggestions.props.onSuggestionSelection();
    expect(c.handleSubmit).toHaveBeenCalled();
    expect(c.props.onSubmit).toHaveBeenCalledWith('poobah');
  });

  it('should reset input and term state and redirect to suggestion', () => {
    let c = render({onSelectSuggestion: expect.createSpy()});
    TestUtils.Simulate.focus(c.refs.input);
    TestUtils.Simulate.change(c.refs.input, {target: {value: 'poobah'}});
    c.refs.suggestions.props.onSuggestionSelection({bppURL: 'http://www.valpak.com/'});
    expect(c.state.term).toEqual('');
    expect(c.refs.input.value).toEqual('');
    expect(c.props.onSelectSuggestion).toHaveBeenCalledWith({bppURL: 'http://www.valpak.com/'});
    expect(window.location.href).toEqual('http://www.valpak.com/');
  });
});

//
// shallow rendering for later
//
// function setup(_props) {
//   let props = {
//     onChange: expect.createSpy(),
//     ..._props
//   };
//
//   let renderer = TestUtils.createRenderer();
//   renderer.render(<Search {...props} />);
//   let output = renderer.getRenderOutput();
//
//   return {
//     props,
//     output,
//     renderer
//   };
// }
//
// it('should only render a form and input element by default', () => {
//   let {output} = setup();
//   let [ form, button, suggestions ] = output.props.children;
//   let input = form.props.children;
//   expect(form.type).toEqual('form');
//   expect(input.type).toEqual('input');
//   expect(button).toNotExist();
//   expect(suggestions).toNotExist();
// });
//
// it('should render a submit button when not narrow', () => {
//   let {output} = setup({narrow: false});
//   let [ form, button ] = output.props.children;
//   expect(button.type).toEqual(Button);
// });
//
// it('should only render suggestions when focused', () => {
//   let {output, renderer} = setup();
//   output.props.onFocus();
//   output = renderer.getRenderOutput();
//   let [ form, button, suggestions ] = output.props.children;
//   expect(suggestions.type).toEqual('div');
//   expect(suggestions.props.children.type).toEqual(SearchSuggest);
// });
//
// it('should wait 100ms to remove focus state', (done) => {
//   let {output, renderer} = setup();
//   output.props.onFocus();
//   output = renderer.getRenderOutput();
//   output.props.onBlur();
//   output = renderer.getRenderOutput();
//   expect(output.props.children[2]).toExist();
//   setTimeout(() => {
//     output = renderer.getRenderOutput();
//     expect(output.props.children[2]).toNotExist();
//     done();
//   }, 100);
// });
//
// it('should handle text input change', () => {
//   let {output, props, renderer} = setup();
//   let form = output.props.children[0];
//   let input = form.props.children;
//   output.props.onFocus();
//   input.props.onChange({target: {value: 'foobar'}});
//   expect(props.onChange).toHaveBeenCalledWith('foobar');
//
//   output = renderer.getRenderOutput();
//   let suggestions = output.props.children[2];
//   expect(suggestions.props.children.props.term).toEqual('foobar');
// });
