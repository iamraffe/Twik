import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function metaReducer(state = initialState.meta, action){
  switch(action.type){
    case types.CHANGE_SIZE:
      return {
        ...state,
        size: action.size
      }
    case types.CHANGE_LAYOUT:
      // console.log(state, action)
      // debugger;
      return {
        ...state,
        orientation: action.orientation
      }
    default:
      return state
  }
}
