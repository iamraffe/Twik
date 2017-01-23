import * as types from '../actions/actionTypes'
import initialState from './initialState'
import _ from 'lodash'

export default function sectionReducer(state = initialState.components, action){
  let componentIndex
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
    case types.UPDATE_COMPONENT:
      componentIndex = _.findIndex(state, (s) => {return s.id === action.componentId})
      return [
        ...state.slice(0, componentIndex),
        {
          ...state[componentIndex],
          ...action.component
        },
        ...state.slice(componentIndex+1)
      ]
    case types.DELETE_COMPONENT:
      componentIndex = _.findIndex(state, (s) => {return s.id === action.componentId})
      return [
        ...state.slice(0, componentIndex),
        ...state.slice(componentIndex+1)
      ]
    case types.DELETE_SECTION:
      return [
        ..._.filter(state, (component) => {
            return component.sectionId !== action.sectionId;
        })
      ]
    default:
      return state
  }
}
