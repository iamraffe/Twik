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
      return {
        ...state,
        orientation: action.orientation
      }
    case types.SET_META_INFO:
      return {
        ...state,
        orientation: action.orientation,
        layout: action.layout,
        size: action.size,
        name: action.name,
        society: action.society,
        multiPage: action.multiPage,
        allows: action.allows,
        accepts: action.accepts,
        printAt: action.printAt
      }
    default:
      return state
  }
}
