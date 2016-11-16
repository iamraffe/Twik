import * as types from './actionTypes'

export function addSectionStructure(section, containerId, rowId, columnId){
  return { type: types.ADD_SECTION_STRUCTURE, section, containerId, rowId, columnId }
}

