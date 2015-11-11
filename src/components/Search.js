import React, {PropTypes, Component} from 'react';
import {findDOMNode} from 'react-dom'
import colors, {brand} from '../theme/colors';
import Flex from './Flex';
import Icon from './Icon';

class Search extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let styles = {
      flex: '1 1 auto',
      background: '#FFF',
      borderRadius: 3,
      maxWidth: 460,
      marginLeft: 30,
      marginRight: 16,
      height: 40,
      overflow: 'hidden',
      fontSize: 16
    }

    let inputStyles = {
      border: 0,
      margin: 0,
      padding: '12px',
      lineHeight: 'normal',
      fontSize: 'inherit',
      background: 'transparent',
      display: 'block',
      flex: '1 1 auto',
      outline: 'none'
    };

    let submitStyles = {
      padding: '0 12px',
      color: colors.white,
      background: brand.secondary
    }

    return (
      <Flex
        flex={1}
        align='stretch'
        style={styles}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        onKeyUp={this.handleKeyUp.bind(this)}>

        <input
          ref="input"
          onChange={this.handleInputChange.bind(this)}
          onInput={this.handleInputChange.bind(this)}
          onKeyUp={this.handleInputChange.bind(this)}
          style={inputStyles}
          placeholder="hair cuts, pizza, oil change, dry cleaning"
          tabIndex="1"/>

        <Flex
          align='center'
          style={submitStyles}
          onTouchTap={this.handleSubmit.bind(this)}
          tabIndex="2">
          <Icon name='search'/>
        </Flex>

        {this.props.children}

      </Flex>
    );
  }

  handleInputChange(e) {
    let inputText = e.target.value;
    if (typeof this.props.onChange === 'function')
      this.props.onChange(inputText);
  }

  handleSubmit() {
    let inputText = findDOMNode(this.refs.input).value;
    if (!inputText)
      return

    if (typeof this.props.onSubmit === 'function')
      this.props.onSubmit(inputText);
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) this.handleSubmit()
  }

  handleFocus(e) {
    var input = findDOMNode(this.refs.input);
    var submit = findDOMNode(this.refs.submit);

    if (this.relatedTargets(e.relatedTarget, input, submit))
      return

    if (typeof this.props.onFocus === 'function') {
      let originRect = submit.getBoundingClientRect();
      this.props.onFocus(originRect.top + 32, originRect.left + 32);
    }

    this.setState({hasFocus: true})
  }

  handleBlur(e) {
    var input = findDOMNode(this.refs.input);
    var submit = findDOMNode(this.refs.submit);

    if (this.relatedTargets(e.relatedTarget, input, submit))
      return

    if (typeof this.props.onBlur === 'function')
      this.props.onBlur();

    this.setState({hasFocus: false})
  }

  relatedTargets(target, ...elements) {
    return elements.reduce((related, element) => {
      return related || target === element;
    }, false)
  }

}

Search.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func
}

Search.defaultProps = {
  onChange: e => null,
  onFocus: e => null,
  onBlur: e => null,
  onSubmit: e => null
}

export default Search;
