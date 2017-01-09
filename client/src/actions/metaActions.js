import * as types from './actionTypes'
import API from '../api/api'

export function changeSize(size){
  return { type: types.CHANGE_SIZE, size }
}

export function changeLayout(orientation, layoutStructure){
  return { type: types.CHANGE_LAYOUT, orientation, layoutStructure }
}

export function setMetaInfo(metaInfo){
  return { type: "SET_META_INFO", ...metaInfo }
}

//THUNKS ALWAYS AT THE BOTTOM
export function saveMenu(menu, society){
  console.log(menu, society)
  debugger;
  return dispatch => {
    return API.post(`/menus`, {menu, society}).then((menu) =>{
      console.log(menu)
      // dispatch(confirmChartSuccess(menu))
    })
    .catch((error) => {
      throw(error)
    })
  }
}