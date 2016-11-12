import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function zoomReducer(state = initialState.zoom, action){
  switch(action.type){
    case types.APPLY_ZOOM:
      return action.amount
    default:
      return state
  }
}
