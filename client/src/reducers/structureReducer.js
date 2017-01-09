import * as types from '../actions/actionTypes'
import initialState from './initialState'
import _ from 'lodash'

export default function structureReducer(state = initialState.structure, action){
  switch(action.type){
    case types.CHANGE_LAYOUT:
      return action.layoutStructure
    case "SET_META_INFO":
      // console.log(state, action)
      return _.find(JSON.parse(action.template).structure.layouts, (l) => {return l.name === action.paper_usage.split('__')[1]}).structure
    default:
      return state
  }
}
