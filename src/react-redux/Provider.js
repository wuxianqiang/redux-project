import React, { Component } from 'react';
import ReduxContext from './context'

class Provider extends Component {
  render() {
    return (
      <ReduxContext.Provider value={{store: this.props.store}}>
        {this.props.children}
      </ReduxContext.Provider>
    );
  }
}

export default Provider;
