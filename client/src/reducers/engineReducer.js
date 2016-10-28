import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function chartReducer(state = initialState.mode, action){
    switch(action.type){
    case types.SELECT_ENGINE_MODE:
      return action.mode
    default:
      return state
  }
}
