import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function styleReducer(state = initialState.styles, action){
  switch(action.type){
    case types.ADD_SECTION_STYLE:
      return [
        ...state,
        action.styles
      ]
    default:
      return state
  }
}
