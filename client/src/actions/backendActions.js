import * as types from './actionTypes'
import API from '../api/api'
import toastr from 'toastr'

export function opreationInProgress(){
  return { type: "SAVING_IN_PROGRESS" }
}

export function createSuccess(menu){
  return { type: "CREATE_SUCCESS", menu }
}

export function updateSuccess(menu){
  return { type: "UPDATE_SUCCESS", menu }
}

export function createError(){
  return { type: "CREATE_ERROR" }
}

export function updateError(){
  return { type: "UPDATE_ERROR" }
}

//THUNKS ALWAYS AT THE BOTTOM
export function saveMenu(menu, society, preview, rendered_pdf){
  return dispatch => {
    dispatch(opreationInProgress())
    return API.post(`/menus`, {menu, society, preview, rendered_pdf}).then((menu) =>{
      console.log("saved menu", menu)
      dispatch(createSuccess(menu))
      toastr.success("Great news! Document saved correctly", "", {positionClass: "toast-top-center"})
    })
    .catch((error) => {
      dispatch(createError())
      throw(error)
    })
  }
}

export function updateMenu(menu, society, preview, object, rendered_pdf){
  return dispatch => {
    dispatch(opreationInProgress())
    return API.put(`/menus/${object.id}`, {menu, society, preview, rendered_pdf}).then((menu) =>{
      console.log("updated menu", menu)
      dispatch(updateSuccess(menu))
      toastr.success("Great news! Document saved correctly", "", {positionClass: "toast-top-center"})
    })
    .catch((error) => {
      dispatch(updateError())
      throw(error)
    })
  }
}
