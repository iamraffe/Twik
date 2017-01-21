import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function backendReducer(state = initialState.saving, action){
  switch(action.type){
    case "SAVING_IN_PROGRESS":
      return true
    case "CREATE_SUCCESS":
    case "UPDATE_SUCCESS":
    case "CREATE_ERROR":
    case "UPDATE_ERROR":
      return false
    default:
      return state
  }
}
