export default function bindActionCreators(actionCreators, dispatch) {
  function bindActionCreator(actionCreators, dispatch) {
    return function () {
      return dispatch(actionCreators.apply(this, arguments))
    }
  }
  if (typeof actionCreators === 'function') {
    bindActionCreator(actionCreators, dispatch)
  }
  const boundActionCreator = {}
  for (const key in actionCreators) {
    boundActionCreator[key] = bindActionCreator(actionCreators[key], dispatch)
  }
  return boundActionCreator
}
