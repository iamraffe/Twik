import * as types from './actionTypes'

export function addSection(section){
  return { type: types.ADD_SECTION, section }
}

export function loadSections(sections){
  return { type: types.LOAD_SECTIONS, sections }
}

export function updateSection(sectionId, section){
  return { type: types.UPDATE_SECTION, sectionId, section }
}

export function deleteSection(sectionId){
  return { type: types.DELETE_SECTION, sectionId }
}
