import * as types from './actionTypes'
import API from '../api/api'
import toastr from 'toastr'

export function opreationInProgress(){
  return { type: "SAVING_IN_PROGRESS" }
}

export function createSuccess(id){
  return { type: "CREATE_SUCCESS", id }
}

export function updateSuccess(){
  return { type: "UPDATE_SUCCESS" }
}

export function createError(){
  return { type: "CREATE_ERROR" }
}

export function updateError(){
  return { type: "UPDATE_ERROR" }
}

//THUNKS ALWAYS AT THE BOTTOM
export function saveMenu(menu, society, preview){
  return dispatch => {
    dispatch(opreationInProgress())
    return API.post(`/menus`, {menu, society, preview}).then((menu) =>{
      dispatch(createSuccess(menu.id))
      toastr.success("Great news! Document saved correctly", "", {positionClass: "toast-top-center"})
    })
    .catch((error) => {
      dispatch(createError())
      throw(error)
    })
  }
}

export function updateMenu(menu, society, preview, object){
  return dispatch => {
    dispatch(opreationInProgress())
    return API.put(`/menus/${object.id}`, {menu, society, preview}).then((menu) =>{
      dispatch(updateSuccess())
      toastr.success("Great news! Document saved correctly", "", {positionClass: "toast-top-center"})
    })
    .catch((error) => {
      dispatch(updateError())
      throw(error)
    })
  }
}