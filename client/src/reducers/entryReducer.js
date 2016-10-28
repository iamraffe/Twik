import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function entryReducer(state = initialState.entries, action){
  // console.log("ACTION ENTRIES => ", action.entries, action)
  switch(action.type){
    case types.LOAD_ENTRIES_SUCCESS:
      return action.entries
    default: 
      return state
  }
}