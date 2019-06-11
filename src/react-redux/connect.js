import React, { Component } from 'react';
import ReduxContext from './context'
import {bindActionCreators} from '../redux'

// 连接组件

export default function (mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return class extends Component {
      static contextType = ReduxContext
      constructor(props, context) {
        // context={store: xxx}
        super(props)
        this.state = mapStateToProps(context.store.getState())
      }
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          this.setState(mapStateToProps(this.context.store.getState()))
        })
      }
      componentWillUnmount() {
        this.unsubscribe()
      }
      render() {
        let actions = {}
        if (typeof mapDispatchToProps === 'function') {
          actions = mapDispatchToProps(this.context.store.dispatch)
        } else {
          actions = bindActionCreators(mapDispatchToProps, this.context.store.dispatch)
        }
        return (
          <WrappedComponent {...this.state} {...actions}></WrappedComponent>
        );
      }
    }
  }
}
