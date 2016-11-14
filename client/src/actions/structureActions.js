import * as types from './actionTypes'

export function addSection(section, containerId, rowId, columnId){
  return { type: types.ADD_SECTION, section, containerId, rowId, columnId }
}