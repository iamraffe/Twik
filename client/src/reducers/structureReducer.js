import * as types from '../actions/actionTypes'
import initialState from './initialState'
import _ from 'lodash'

export default function structureReducer(state = initialState.structure, action){

  switch(action.type){
    case types.CHANGE_LAYOUT:
      console.log(initialState, action)
      return action.layoutStructure
    default:
      return state
  }
}
