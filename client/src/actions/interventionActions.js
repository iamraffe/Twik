import * as types from './actionTypes'
import API from '../api/api'

export function loadInterventionsSuccess(interventions){
  return { type: types.LOAD_INTERVENTIONS_SUCCESS, interventions}
}

//THUNKS ALWAYS AT THE BOTTOM
export function loadInterventions(userId){
  return dispatch => {
    return API.get(`/users/${userId}/interventions`).then((interventions) =>{
      // console.log("API CALL )> ", interventions)
      dispatch(loadInterventionsSuccess(interventions))
    })
    .catch((error) => {
      throw(error)
    })
  }
}
