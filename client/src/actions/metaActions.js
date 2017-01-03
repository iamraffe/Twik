import * as types from './actionTypes'

export function changeSize(size){
  return { type: types.CHANGE_SIZE, size }
}

export function changeLayout(orientation, layoutStructure){
  return { type: types.CHANGE_LAYOUT, orientation, layoutStructure }
}

export function setMetaInfo(metaInfo){
  return { type: "SET_META_INFO", ...metaInfo }
}