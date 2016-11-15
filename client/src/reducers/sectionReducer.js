import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function sectionReducer(state = initialState.sections, action){
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
