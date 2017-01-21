import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function menuReducer(state = initialState.id, action){
  switch(action.type){
    case "CREATE_SUCCESS":
      console.log(action)
      debugger;
      return action.id
    default:
      return state
  }
}
