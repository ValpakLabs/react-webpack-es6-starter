import React from 'react';
import SelectableList from './SelectableList';

class AutoSuggest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      selectedIndex: -1
    };
  }

  componentDidMount() {
    this.getSuggestions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.term !== this.props.term ||
        prevProps.geo !== this.props.geo)
      this.getSuggestions();
  }

  render() {
    if (!this.state.suggestions.length) return null;
    return (
      <div ref='suggestionList'>
        <SelectableList
          selectedIndex={this.state.selectedIndex}
          items={this.state.suggestions.map((item, index) => ({label: item.businessName, value: item}))}
          onSelectedIndexChange={(prevIndex, index) => this.handleIndexChange(prevIndex, index)}
          onItemSelected={(index, item) => this.handleSuggestionSelection(index, item)}/>
      </div>
    );
  }

  getSuggestions() {
    if (!this.props.term) {
      this.setState({
        suggestions: [],
        selectedIndex: -1
      });
      return;
    }

    let {url, term, itemCount} = this.props;

    fetch(`${url}?term=${term}&count=${itemCount}&geo=${this.props.geo}`)
      .then(res => {
        res
          .json()
          .then(json => this.handleResponse(json))
          .catch(error => this.handleError(error));
      })
      .catch(error => this.handleError(error));
  }

  handleResponse(res) {
    this.setState({
      suggestions: res,
      selectedIndex: -1
    });
    this.props.onFetch(res);
  }

  handleError(err) {
    this.props.onError(err);
  }

  next() {
    if (this.state.selectedIndex < this.state.suggestions.length - 1)
      this.handleIndexChange(this.state.selectedIndex + 1);
  }

  prev() {
    if (this.state.selectedIndex > 0)
      this.handleIndexChange(this.state.selectedIndex - 1);
  }

  selectSuggestion() {
    this.handleSuggestionSelection(this.state.selectedIndex, this.state.suggestions[this.state.selectedIndex]);
  }

  handleIndexChange(index) {
    this.setState({selectedIndex: index});
    this.props.onSuggestionFocus(this.state.suggestions[index]);
  }

  handleSuggestionSelection(index, item) {
    this.setState({selectedIndex: index});
    this.props.onSuggestionSelection(item);
  }

}

AutoSuggest.defaultProps = {
  term: '',
  url: 'https://vpdev.valpak.com/pub/auto/name/businessname',
  itemCount: 5,
  geo: 'Saint Petersburg, FL',
  onSuggestionFocus: e => null,
  onSuggestionSelection: e => null,
  onFetch: e => null,
  onError: e => null
};

export default AutoSuggest;
