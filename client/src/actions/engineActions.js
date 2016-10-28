import * as types from './actionTypes'

export function selectEngineMode(mode){
  return { type: types.SELECT_ENGINE_MODE, mode }
}