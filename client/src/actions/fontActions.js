import * as types from './actionTypes'

export function changePrimaryFont(fontFamily){
  return { type: types.CHANGE_PRIMARY_FONT, fontFamily }
}

export function changeSecondaryFont(fontFamily){
  return { type: types.CHANGE_SECONDARY_FONT, fontFamily }
}

export function changeTertiaryFont(fontFamily){
  return { type: types.CHANGE_TERTIARY_FONT, fontFamily }
}

export function changeFont(fontKey, fontFamily){
  return { type: types.CHANGE_FONT, fontKey, fontFamily }
}