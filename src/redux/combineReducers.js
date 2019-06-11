export default function (reducers) {
  const reducerKeys = Object.keys(reducers)
  // 返回一个reducer会传入createStore创建仓库
  return function (state = {}, action) {
    // 合并状态
    const nextState = {}
    for (let i = 0; i < reducerKeys.length; i++) {
      // key
      const key = reducerKeys[i]
      // reducer
      const reducer = reducers[key]
      // 计算性的状态
      const previousStateKey = state[key]
      const nextStateForKey = reducer(previousStateKey, action)
      nextState[key] = nextStateForKey
    }
    return nextState
  }
}
