import React, { Component } from 'react';
import {bindActionCreators} from '../redux'
import store from '../store'
import actions from '../store/action'

let boundActions = bindActionCreators(actions, store.dispatch)

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: store.getState().counter1.num
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ num: store.getState().counter1.num })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleClick = () => {
    boundActions.increment()
  }

  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <button onClick={this.handleClick}>
          +
        </button>
      </div>
    );
  }
}

export default Counter;
