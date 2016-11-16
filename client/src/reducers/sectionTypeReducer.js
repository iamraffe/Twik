import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function sectionTypeReducer(state = initialState.section_types, action){
  switch(action.type){
    case types.ADD_SECTION_TYPE:
      console.log(state, action.section)
      // debugger;
      return {
        ...state,
        custom: [
          action.section
        ]
      }
    // case types.CHANGE_LAYOUT:
    //   return {
    //     ...state,
    //     template: _.find(template.layouts, (l) => {return l.name === menu.meta.layout}).structure
    //   }
    default:
      return state
  }
}
