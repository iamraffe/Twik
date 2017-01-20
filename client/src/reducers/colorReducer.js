import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function colorReducer(state = initialState.colors, action){
  switch(action.type){
    case types.SET_META_INFO:
      return JSON.parse(action.template).structure.colors
    case types.CHANGE_PRIMARY_FONT:
      return {
        ...state,
        primary_color: action.color
      }
    case types.CHANGE_SECONDARY_FONT:
      return {
        ...state,
        secondary_color: action.color
      }
    case types.CHANGE_TERTIARY_FONT:
      return {
        ...state,
        tertiary_color: action.color
      }
    case types.CHANGE_QUATERNARY_COLOR:
      return {
        ...state,
        quaternary_color: action.color
      }
    case types.CHANGE_QUINARY_COLOR:
      return {
        ...state,
        quinary_color: action.color
      }
    case types.CHANGE_COLOR:
      let toChange = {}
      toChange[action.colorKey] = action.color
      return _.assign({}, state, toChange)
    default:
      return state
  }
}
