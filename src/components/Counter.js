import React, { Component } from 'react';
// import {bindActionCreators} from '../redux'
// import store from '../store'
import { connect } from 'react-redux'
import actions from '../store/action'

// let boundActions = bindActionCreators(actions, store.dispatch)

class Counter extends Component {
  handleClick = () => {
    console.log(this.props)
    this.props.increment()
  }

  render() {
    return (
      <div>
        <p>{this.props.num}</p>
        <button onClick={this.handleClick}>
          +
        </button>
      </div>
    );
  }
}
// connect 连接仓库和组件
const mapStateToProps = state => {
  return state.counter1
}
// 优化性能，当属性改变刷新视图

const mapDispatchToProps = dispatch => {
  return {
    increment: (...args) => dispatch(actions.increment(...args))
  }
}

export default connect(mapStateToProps, actions)(Counter);
