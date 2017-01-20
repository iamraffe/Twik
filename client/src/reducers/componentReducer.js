import * as types from '../actions/actionTypes'
import initialState from './initialState'
import _ from 'lodash'

export default function sectionReducer(state = initialState.components, action){
  switch(action.type){
    case types.SET_META_INFO:
      let layouts = JSON.parse(action.template).structure.layouts
      return _.find(layouts, (layout) => {return layout.name === action.layout}).components
    case types.LOAD_COMPONENTS:
      return action.components
    case types.ADD_COMPONENT:
      return [
        ...state,
        action.component
      ]
    // case types.ADD_MENU_ELEMENT:
    //   sectionIndex = _.findIndex(state, (s) => {return s.id === action.sectionId})
    //   // console.log(sectionIndex, action, state)
    //   return [
    //     ...state.slice(0, sectionIndex),
    //     {
    //       ...state[sectionIndex],
    //       elements: [
    //         ...state[sectionIndex].elements,
    //         action.element
    //       ]
    //     },
    //     ...state.slice(sectionIndex+1)
    //   ]
    // case types.UPDATE_MENU_ELEMENT:
    //   sectionIndex = _.findIndex(state, (s) => {return s.id === action.sectionId})
    //   elementIndex = _.findIndex(state[sectionIndex].elements, (e) => {return e.id === action.element.id})
    //   console.log(sectionIndex, action, state, elementIndex)
    //   return [
    //     ...state.slice(0, sectionIndex),
    //     {
    //       ...state[sectionIndex],
    //       elements: [
    //         ...state[sectionIndex].elements.slice(0, elementIndex),
    //         {
    //           ...state[sectionIndex].elements[elementIndex],
    //           ...action.element
    //         },
    //         ...state[sectionIndex].elements.slice(elementIndex+1),
    //       ]
    //     },
    //     ...state.slice(sectionIndex+1)
    //   ]
    // case types.DELETE_MENU_ELEMENT:
    //   sectionIndex = _.findIndex(state, (s) => {return s.id === action.sectionId})
    //   elementIndex = _.findIndex(state[sectionIndex].elements, (e) => {return e.position === action.position})
    //   // console.log(sectionIndex, action, state, elementIndex)
    //   return [
    //     ...state.slice(0, sectionIndex),
    //     {
    //       ...state[sectionIndex],
    //       elements: [
    //         ...state[sectionIndex].elements.slice(0, elementIndex),
    //         ...state[sectionIndex].elements.slice(elementIndex+1),
    //       ]
    //     },
    //     ...state.slice(sectionIndex+1)
    //   ]
    default:
      return state
  }
}
