import isPlainObject from './utils/isPlainObject'
import ActionTypes from './utils/actionTypes'

export default function createStore(reducer, preload) {
  if (typeof reducer !== 'function') {
    throw new Error('reducer必须是个函数')
  }
  let currentReducer = reducer
  let currentState = preload
  let currentListeners = []
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('action必须是个纯对象')
    }
    if (typeof action.type === 'undefined') {
      throw new Error('action必须是个字符串')
    }
    currentState = currentReducer(currentState, action)
    for (let i = 0; i < currentListeners.length; i++) {
      const listener = currentListeners[i];
      listener()
    }
    return action
  }
  function getState() {
    return currentState
  }
  function subscribe(listener) {
    let subscribed = true
    currentListeners.push(listener)
    return function unsubscribe() {
      if (!subscribed) return
      let index = currentListeners.indexOf(listener)
      currentListeners.splice(index, 1)
      subscribed = true
    }
  }
  dispatch({ type: ActionTypes.INIT })
  return {
    dispatch,
    getState,
    subscribe,
  }
}
