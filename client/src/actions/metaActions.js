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

export function updateMetaInfo(updatedMetaInfo){
  return { type: "UPDATE_META_INFO", updatedMetaInfo }
}
