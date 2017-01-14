import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function templateReducer(state = initialState.template, action){
  switch(action.type){
    case "SET_META_INFO":
      // console.log(state, action)
      return JSON.parse(action.template)
    default:
      return state
  }
}
