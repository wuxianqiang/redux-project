import * as Types from './action-types'

let actions = {
  increment() {
    return { type: Types.INCREMENT }
  },
  decrement() {
    return { type: Types.DECREMENT }
  }
}

export default actions
