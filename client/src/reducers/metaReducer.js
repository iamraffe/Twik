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
      console.log(state, action)

      // debugger;
      return {
        ...state,
        title: action.menu_name,
        orientation: action.paper_usage.split('__')[0],
        layout: action.paper_usage.split('__')[1],
        size: action.paper_size,
        name: action.menu_name,
        society: action.society
      }
    default:
      return state
  }
}
