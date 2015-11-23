import React, {PropTypes, Component} from 'react';
import {findDOMNode} from 'react-dom';
import colors, {brand} from '../theme/colors';
import Flex from './Flex';
import Icon from './Icon';
import Button from './Button';
import SearchSuggest from './SearchSuggest';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      term: '',
      hasFocus: false
    };
  }

  render() {
    const {narrow} = this.props;

    let styles = {
      flex: '1 1 auto',
      position: narrow ? 'static' : 'relative',
      background: '#FFF',
      borderRadius: 2,
      maxWidth: 460,
      marginLeft: narrow ? 12 : 30,
      marginRight: narrow ? 0 : 12,
      height: 40,
      fontSize: 16
    };

    let inputStyles = {
      border: 0,
      margin: 0,
      padding: narrow ? 0 : '0px 8px',
      lineHeight: '24px',
      fontSize: 16,
      background: 'transparent',
      display: 'block',
      width: '100%',
      outline: 'none'
    };

    return (
      <Flex
        flex={1}
        align='stretch'
        style={styles}
        onFocus={e => this.handleFocus(e)}
        onBlur={e => this.handleBlur(e)}
        onKeyUp={e => this.handleKeyUp(e)}>

        <form ref='form' action='' onSubmit={e => e.preventDefault()} style={{margin: 0, padding: 0, flex: '1 1 auto', display: 'flex'}}>
          <input
            ref='input'
            type='search'
            autofocus={true}
            onChange={e => this.handleInputChange(e.target.value)}
            onInput={e => this.handleInputChange(e.target.value)}
            onKeyUp={e => this.handleInputChange(e.target.value)}
            style={inputStyles}
            placeholder={narrow ? 'Search' : 'Pizza, Great Clips, Oil Change...'}
            tabIndex='1'/>
        </form>

        {!narrow &&
          <Button
            ref='submit'
            style={{borderRadius: '0px 2px 2px 0', paddingLeft: 12, paddingRight: 10}}
            fill={brand.secondary}
            color={colors.white}
            icon='search'
            onClick={e => this.handleSubmit()}
            tabIndex='2'/>}

        <div
          style={{
            position: 'absolute',
            top: narrow ? 59 : 41,
            left: 0,
            width: '100%',
            boxShadow: narrow ? 'none' : '0px 4px 8px rgba(0,0,0,0.2)',
            borderRadius: narrow ? 0 : 2,
            borderBottom: narrow ? `1px solid ${colors.grey300}` : 0,
            overflow: 'hidden'
          }}>
          {this.state.hasFocus &&
            <SearchSuggest
              ref='suggestions'
              narrow={narrow}
              term={this.state.term}
              onSuggestionFocus={suggestion => this.handleSuggestionFocus(suggestion)}
              onSuggestionSelection={suggestion => this.handleSuggestionSelection(suggestion)}/>}
        </div>

      </Flex>
    );
  }

  handleFocus() {
    this.setState({hasFocus: true});
  }

  handleBlur() {
    setTimeout(() => {
      this.setState({hasFocus: false});
    }, 100);
  }

  handleSuggestionFocus(suggestion) {
    console.log('focused', suggestion);
  }

  handleSuggestionSelection(suggestion) {
    if (!suggestion)
      this.handleSubmit();
    else {
      this.setState({term: ''});
      this.refs.input.value = '';
      this.props.onSelectSuggestion(suggestion);
      window.location.href = suggestion.bppURL;
    }
  }

  handleInputChange(value) {
    let term = value;
    this.setState({term});
    this.props.onChange(term);
  }

  handleSubmit() {
    if (!this.state.term) return;
    this.props.onSubmit(this.state.term);
    console.log(`submitting ${this.state.term}`);
  }

  handleKeyUp(e) {
    if (e.keyCode === 13)
      this.refs.suggestions.selectSuggestion();
    if (e.keyCode === 40)
      this.refs.suggestions.next();
    else if (e.keyCode === 38)
      this.refs.suggestions.prev();
  }

}

Search.propTypes = {
  narrow: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func,
  onSelectSuggestion: PropTypes.func
};

Search.defaultProps = {
  narrow: true,
  onChange: e => null,
  onFocus: e => null,
  onBlur: e => null,
  onSubmit: e => null,
  onSelectSuggestion: e => null
};

export default Search;
