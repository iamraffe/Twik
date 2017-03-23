import * as types from './actionTypes'

export function changePrimaryColor(color){
  return { type: types.CHANGE_PRIMARY_COLOR, color }
}

export function changeSecondaryColor(color){
  return { type: types.CHANGE_SECONDARY_COLOR, color }
}

export function changeTertiaryColor(color){
  return { type: types.CHANGE_TERTIARY_COLOR, color }
}

export function changeQuaternaryColor(color){
  return { type: types.CHANGE_QUATERNARY_COLOR, color }
}

export function changeQuinaryColor(color){
  return { type: types.CHANGE_QUINARY_COLOR, color }
}

export function changeColor(color, colorKey, wildcard){
  return { type: types.CHANGE_COLOR, color, colorKey, wildcard }
}
