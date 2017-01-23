import * as types from '../actions/actionTypes'
import initialState from './initialState'
import _ from 'lodash'

export default function sectionReducer(state = initialState.sections, action){
  let sectionIndex, elementIndex
  switch(action.type){
    case types.SET_META_INFO:
      let layouts = JSON.parse(action.template).structure.layouts
      return _.find(layouts, (layout) => {return layout.name === action.layout}).sections
    case types.ADD_SECTION:
      return [
        ...state,
        action.section
      ]
    case types.LOAD_SECTIONS:
      return action.sections
    case types.UPDATE_SECTION:
      sectionIndex = _.findIndex(state, (s) => {return s.id === action.sectionId})
      return [
        ...state.slice(0, sectionIndex),
        {
          ...state[sectionIndex],
          ...action.section
        },
        ...state.slice(sectionIndex+1)
      ]
    case types.DELETE_SECTION:
      sectionIndex = _.findIndex(state, (s) => {return s.id === action.sectionId})
      return [
        ...state.slice(0, sectionIndex),
        ...state.slice(sectionIndex+1)
      ]
    default:
      return state
  }
}
