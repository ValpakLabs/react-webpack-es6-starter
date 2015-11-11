import React from 'react';
import SelectableList from './SelectableList';

class GeoAutoComplete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      geoResults: []
    }

    this.handleResponse = this.handleResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.getSuggestions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.term !== this.props.term)
      this.getSuggestions();
  }

  renderResultsList() {
    if (this.state.geoResults.length) {
      let selectableItems = this.state.geoResults.map((result, index) => {
        let geo = `${result.city}, ${result.state}`;
        return {label: geo, value: geo};
      })
      return (
        <div className="GeoAutoComplete" ref="geoResultsList" >
          <SelectableList
            items={selectableItems}
            onSelectedIndexChange={this.handleIndexChange.bind(this)}
            onItemSelected={this.handleItemSelected.bind(this)}/>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return this.renderResultsList();
  }

  handleIndexChange(prevIndex, index) {
    this.props.onGeoFocus(this.state.geoResults[index])
  }

  handleItemSelected(index) {
    this.props.onGeoSelected(this.state.geoResults[index])
  }

  getSuggestions() {
    if (this.props.term) {
      let url = this.props.url;
      let term = this.props.term;

      fetch(`${url}?term=${term}&count=${count}`)
        .then(res => {
          const json = res.json()
            .then(this.handleResponse)
        })

    } else {
      this.setState({
        geoResults: []
      })
    }
  }

  handleResponse(res) {
    let geoResults = JSON.parse(res.text);
    this.setState({geoResults});
    this.props.onResponse(geoResults);
  }

  handleError(err) {
    this.props.onError(err);
  }

}

GeoAutoComplete.defaultProps = {
  term: '',
  url: 'https://vpdev.valpak.com/pub/auto/geo/cities',
  itemCount: 5,
  onResponse: function() {},
  onError: function() {},
  onGeoFocus: function() {},
  onGeoSelected: function() {}
}

export default GeoAutoComplete;
