import * as types from './actionTypes'
import API from '../api/api'

export function loadUsersSuccess(users){
  return { type: types.LOAD_USERS_SUCCESS, users }
}

//THUNKS ALWAYS AT THE BOTTOM
export function loadUsers(){
  return dispatch => {
    return API.get(`/users`).then((users) =>{
      dispatch(loadUsersSuccess(users))
    })
    .catch((error) => {
      throw(error)
    })
  }
}
