import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function fontReducer(state = initialState.fontFamilies, action){
  switch(action.type){
    case types.CHANGE_PRIMARY_FONT:
      return {
        ...state,
        primary_font: action.fontFamily
      }
    case types.CHANGE_SECONDARY_FONT:
      return {
        ...state,
        secondary_font: action.fontFamily
      }
    case types.CHANGE_TERTIARY_FONT:
      return {
        ...state,
        tertiary_font: action.fontFamily
      }
    case types.CHANGE_FONT:
      let toChange = {}
      toChange[action.fontKey] = action.fontFamily
      return _.assign({}, state, toChange)
    default:
      return state
  }
}
