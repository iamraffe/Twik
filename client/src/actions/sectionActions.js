import * as types from './actionTypes'

export function addSection(section){
  return { type: types.ADD_SECTION, section }
}

export function addMenuElement(element, sectionId){
  return { type: types.ADD_MENU_ELEMENT, element, sectionId }
}

export function updateMenuElement(element, sectionId){
  return { type: types.UPDATE_MENU_ELEMENT, element, sectionId }
}

export function deleteMenuElement(position, sectionId){
  return { type: types.DELETE_MENU_ELEMENT, position, sectionId }
}