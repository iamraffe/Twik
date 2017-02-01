import * as types from './actionTypes'
import API from '../api/api'
import toastr from 'toastr'

export function operationInProgress(){
  return { type: "OPERATION_IN_PROGRESS" }
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

export function previewSuccess(){
  return { type: "PREVIEW_SUCCESS" }
}

export function previewError(){
  return { type: "PREVIEW_ERROR" }
}

//THUNKS ALWAYS AT THE BOTTOM
// export function previewMenu(menu, society, preview, rendered_pdf){
//   return dispatch => {
//     dispatch(operationInProgress())
//     return API.post(`/menus`, {menu, society, preview, rendered_pdf}).then((response) =>{
//       if (response.ok !== false) {
//         console.log("saved menu", response.menu)
//         dispatch(createSuccess(response.menu))
//         toastr.success("Great news! Document saved correctly", "", {positionClass: "toast-top-center"})
//       }
//       else{
//         dispatch(createError())
//         toastr.error("Oops! Your document could not be saved", "Internal error", {positionClass: "toast-top-center"})
//       }
//     })
//     .catch((error) => {
//       dispatch(createError())
//       throw(error)
//     })
//   }
// }

export function saveMenu(menu, society, preview, rendered_pdf){
  return dispatch => {
    dispatch(operationInProgress())
    return API.post(`/menus`, {menu, society, preview, rendered_pdf}).then((response) =>{
      if (response.ok !== false) {
        console.log("saved menu", response.menu)
        dispatch(createSuccess(response.menu))
        toastr.success("Great news! Document saved correctly", "", {positionClass: "toast-top-center"})
      }
      else{
        dispatch(createError())
        toastr.error("Oops! Your document could not be saved", "Internal error", {positionClass: "toast-top-center"})
      }
    })
    .catch((error) => {
      dispatch(createError())
      throw(error)
    })
  }
}

export function updateMenu(menu, society, preview, object, rendered_pdf){
  return dispatch => {
    dispatch(operationInProgress())
    return API.put(`/menus/${object.id}`, {menu, society, preview, rendered_pdf}).then((response) =>{
      if (response.ok !== false) {
        console.log("updated menu", response.menu)
        dispatch(updateSuccess(response.menu))
        toastr.success("Great news! Document saved correctly", "", {positionClass: "toast-top-center"})
      }
      else{
        dispatch(updateError())
        toastr.error("Oops! Your document could not be saved", "Internal error", {positionClass: "toast-top-center"})
      }
    })
    .catch((error) => {
      dispatch(updateError())
      throw(error)
    })
  }
}


