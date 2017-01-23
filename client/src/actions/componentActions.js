import * as types from './actionTypes'

export function loadComponents(components){
  return { type: types.LOAD_COMPONENTS, components }
}

export function addComponent(component){
  return { type: types.ADD_COMPONENT, component }
}

export function updateComponent(component, componentId){
  return { type: types.UPDATE_COMPONENT, component, componentId }
}

export function deleteComponent(position, componentId){
  return { type: types.DELETE_COMPONENT, position, componentId }
}
