import * as types from './actionTypes'

export function loadComponents(components){
  return { type: types.LOAD_COMPONENTS, components }
}

export function addComponent(component){
  return { type: types.ADD_COMPONENT, component }
}