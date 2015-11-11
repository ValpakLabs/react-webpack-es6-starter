import React from 'react';

class AutoSuggest extends React.Component {

  constructor(props) {
    super(props);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleError = this.handleError.bind(this);
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
    return null
  }

  getSuggestions() {
    if (this.props.term) {
      let url = this.props.url;
      let term = this.props.term;

      fetch(`${url}?term=${term}&count=${count}&geo=${this.props.geo}`)
        .then(res => {
          const json = res.json()
            .then(this.handleResponse)
        });
    }
  }

  handleResponse(res) {
    this.props.onResponse(JSON.parse(res.text));
  }

  handleError(err) {
    console.error(err)
    this.props.onError(err);
  }

}

AutoSuggest.defaultProps = {
  term: '',
  url: 'https://vpdev.valpak.com/pub/auto/name/businessname',
  itemCount: 5,
  geo: 'Saint Petersburg, FL',
  onResponse: function() {},
  onError: function() {},
}

export default AutoSuggest;
