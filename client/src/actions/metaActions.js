import * as types from './actionTypes'

export function changeSize(size){
  return { type: types.CHANGE_SIZE, size }
}