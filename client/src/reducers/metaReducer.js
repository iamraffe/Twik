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
    case "SET_META_INFO":
      // console.log(state, action)

      // debugger;
      return {
        ...state,
        title: action.name,
        orientation: action.orientation,
        layout: action.layout,
        size: action.size,
        name: action.name,
        society: action.society,
        multiPage: action.multiPage,
        allows: action.allows
      }
    default:
      return state
  }
}
