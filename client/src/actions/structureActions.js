import * as types from './actionTypes'

export function addSectionStructure(section, containerId, rowId, columnId){
  return { type: types.ADD_SECTION_STRUCTURE, section, containerId, rowId, columnId }
}

export function addMenuElement(element, containerId, rowId, columnId, sectionId){
  return { type: types.ADD_MENU_ELEMENT, element, containerId, rowId, columnId, sectionId }
}