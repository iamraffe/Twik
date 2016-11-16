import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function sectionTypeReducer(state = initialState.section_types, action){
  switch(action.type){
    case types.ADD_SECTION_TYPE:
      console.log(state, action.section)
      // debugger;
      return [
        ...state,
        action.section
      ]
    default:
      return state
  }
}
