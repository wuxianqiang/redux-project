import * as Types from '../action-types'

let initState = { num: 0 }
function reducer(state = initState, action) {
  switch (action.type) {
    case Types.INCREMENT:
      return { num: state.num + 2 }
    case Types.DECREMENT:
      return { num: state.num - 2 }
    default:
      return state
  }
}
export default reducer
