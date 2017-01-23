import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function menuReducer(state = initialState.menu, action){
  switch(action.type){
    case "CREATE_SUCCESS":
      return {
        ...state,
        object: {
          ...state.object,
          id: action.id
        }
      }
    default:
      return state
  }
}
