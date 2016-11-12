import * as types from './actionTypes'

export function applyZoom(amount){
  return { type: types.APPLY_ZOOM, amount }
}