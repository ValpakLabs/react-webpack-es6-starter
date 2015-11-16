
import React from 'react';
import responsive from './responsive';

class Container extends React.Component {
  render() {
    const size = this.context.viewportSize || this.props.size || 'xs';

    const maxWidth = {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: 1024
    }[size];

    let sidePadding = {
      xs: 10,
      sm: 10,
      md: 10,
      lg: 0
    }[size];

    const styles = {
      padding: `0 ${sidePadding}px`,
      margin: '0 auto',
      width: '100%',
      maxWidth,
      ...this.props.style
    };

    return (
      <div style={styles}>{this.props.children}</div>
    );
  }
}

export default responsive(Container);
