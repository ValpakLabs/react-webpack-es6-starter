import React from 'react';
import colors, {brand} from '../theme/colors';
import SelectableList from './SelectableList';
import Flex from './Flex';
import Icon from './Icon';

class GeoAutoComplete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      geoSearchTerm: '',
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
            onSelectedIndexChange={::this.handleIndexChange}
            onItemSelected={::this.handleGeoSelection}/>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const {currentGeo} = this.props;

    const styles = {
      form: {
        border: this.props.narrow ? `1px solid ${colors.grey300}` : 0,

        padding: '0 12px',
        background: this.props.narrow ? colors.white : colors.grey50
      },
      input: {
        border: 0,
        background: 'transparent',
        fontSize: 16,
        lineHeight: '60px',
        width: '100%',
        margin: '0 0 0 8px',
        padding: '6px 0',
        outline: 'none'
      },
      markerIcon: {
        color: brand.tertiary
      },
      suggestionList: {
        borderTop: `${this.props.narrow ? 0 : 1}px solid ${colors.grey300}`,
        borderLeft: `${this.props.narrow ? 1 : 0}px solid ${colors.grey300}`,
        borderRight: `${this.props.narrow ? 1 : 0}px solid ${colors.grey300}`
      }
    };

    return (
      <div>
        <form ref="geoChangeForm" style={styles.form} onSubmit={::this.handleGeoChangeSubmit}>
          <Flex align='center'>
            <Icon style={styles.markerIcon} name="location_on" />
            <input
              ref="geoInputField"
              style={styles.input}
              placeholder='Search by postal code or city'
              onChange={::this.handleGeoInputChange}
              value={this.state.geoSearchTerm} />
          </Flex>
        </form>
        <div style={styles.suggestionList}>
          {this.renderResultsList()}
        </div>
      </div>
    );
  }

  handleIndexChange(prevIndex, index) {
    const focusGeo = this.state.geoResults[index];
    this.refs.geoInputField.value = `${focusGeo.city}, ${focusGeo.state}`;
    this.props.onGeoFocus(this.state.geoResults[index])
  }

  handleGeoSelection(index) {
    this.props.onGeoSelected(this.state.geoResults[index]);
    this.resetAll();
  }

  handleGeoInputChange(e) {
    this.getSuggestions(e.target.value);
    this.setState({
      geoSearchTerm: e.target.value
    });
  }

  handleGeoChangeSubmit(e) {
    e.preventDefault();
    let geoInputField = this.refs.geoInputField;
    let geoValue = geoInputField.value;

    geoInputField.blur();
    this.props.onGeoSelected(geoValue);
    this.resetAll();
  }

  getSuggestions(term) {
    if (term) {
      let {url, itemCount} = this.props;

      fetch(`${url}?term=${term}&count=${itemCount}`)
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
    let geoResults = res;
    this.setState({geoResults});
    this.props.onResponse(geoResults);
  }

  handleError(err) {
    this.props.onError(err);
  }

  resetAll() {
    setTimeout(() => {
      this.setState({
        geoSearchTerm: '',
        geoResults: []
      });
    }, 200);
  }

  focus() {
    console.log(this.refs.geoInputField);
    setTimeout(() => {
      this.refs.geoInputField.focus();
    })
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
