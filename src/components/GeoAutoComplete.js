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
      geoResults: [],
      selectedIndex: -1
    };
  }

  renderResultsList() {
    if (this.state.geoResults.length) {
      let selectableItems = this.state.geoResults.map((result, index) => {
        let geo = `${result.city}, ${result.state}`;
        return {label: geo, value: geo};
      });
      return (
        <div ref='geoResultsList'>
          <SelectableList
            selectedIndex={this.state.selectedIndex}
            items={selectableItems}
            onSelectedIndexChange={(prevIndex, index) =>
              this.handleIndexChange(prevIndex, index)}
            onItemSelected={index => this.handleGeoSelection(index)}/>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const {currentGeo, error} = this.props;

    const styles = {
      form: {
        border: this.props.narrow ? `1px solid ${colors.grey300}` : 0,
        borderBottom: 0,
        padding: '0 12px',
        background: this.props.narrow ? colors.white : colors.grey50
      },
      input: {
        border: 0,
        background: 'transparent',
        fontSize: 16,
        lineHeight: '24px',
        width: '100%',
        margin: '0 0 0 8px',
        padding: '6px 0',
        outline: 'none'
      },
      markerIcon: {
        color: brand.tertiary
      },
      suggestionList: {
        borderTop: `${this.props.narrow ? 0 : 0}px solid ${colors.grey300}`,
        borderBottom: `${this.props.narrow ? 1 : 0}px solid ${colors.grey300}`,
        borderLeft: `${this.props.narrow ? 1 : 0}px solid ${colors.grey300}`,
        borderRight: `${this.props.narrow ? 1 : 0}px solid ${colors.grey300}`
      },
      error: {
        background: colors.red500,
        borderBottom: `1px solid ${colors.red700}`,
        color: colors.white,
        lineHeight: '18px',
        fontWeight: 600,
        padding: 12
      }
    };

    return (
      <div>
        {error &&
          <div ref='error'>
            <Flex align='center' justify='center' style={styles.error}>
              <Icon name='error_outline' size={24} pushRight={10}/> {error}
            </Flex>
          </div>}
        <form
          ref='geoChangeForm'
          style={styles.form}
          onKeyUp={e => this.handleKeyUp(e)}
          onSubmit={e => this.handleGeoChangeSubmit(e)}>
          <Flex align='center' style={{height: 72}}>
            <Icon style={styles.markerIcon} name='location_on' />
            <input
              ref='geoInputField'
              style={styles.input}
              placeholder='Search by postal code or city'
              onChange={e => this.handleGeoInputChange(e.target.value)}
            />
          </Flex>
        </form>

        <div style={styles.suggestionList}>
          {this.renderResultsList()}
        </div>
      </div>
    );
  }

  handleKeyUp(e) {
    if (e.keyCode === 40)
      this.next();
    else if (e.keyCode === 38)
      this.prev();
  }

  next() {
    if (this.state.selectedIndex < this.state.geoResults.length - 1)
      this.handleIndexChange(this.state.selectedIndex + 1);
  }

  prev() {
    if (this.state.selectedIndex > 0)
      this.handleIndexChange(this.state.selectedIndex - 1);
  }

  handleIndexChange(index) {
    const focusGeo = this.state.geoResults[index];
    this.refs.geoInputField.value = `${focusGeo.city}, ${focusGeo.state}`;
    this.props.onGeoFocus(this.state.geoResults[index]);
    this.setState({selectedIndex: index});
  }

  handleGeoSelection(index) {
    if (!this.state.geoResults[index]) return;
    this.setState({selectedIndex: index});
    this.props.onGeoSelected(this.state.geoResults[index]);
  }

  handleGeoInputChange(value) {
    this.getSuggestions(value);
    this.setState({
      geoSearchTerm: value,
      selectedIndex: -1
    });
  }

  handleGeoChangeSubmit(e) {
    e.preventDefault();
    let geoInputField = this.refs.geoInputField;
    let geoValue = geoInputField.value;
    if (!geoValue) return;
    this.props.onGeoSelected(geoValue);
  }

  getSuggestions(term) {
    if (term) {
      let {url, itemCount} = this.props;

      fetch(`${url}?term=${term}&count=${itemCount}`).then(res => {
        res.json()
          .then(json => this.handleResponse(json))
          .catch(error => this.handleError(error));
      }).catch(error => this.handleError(error));

    } else {
      this.setState({
        geoResults: []
      });
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
    }, this.props.resetDelay);
  }

  focus() {
    setTimeout(() => {
      this.refs.geoInputField.focus();
    });
  }

}

GeoAutoComplete.defaultProps = {
  currentGeo: {},
  narrow: false,
  term: '',
  url: 'https://vpdev.valpak.com/pub/auto/geo/cities',
  itemCount: 5,
  resetDelay: 200,
  error: null,
  onResponse: e => null,
  onError: e => null,
  onGeoFocus: e => null,
  onGeoSelected: e => null
};

export default GeoAutoComplete;
