import * as types from './actionTypes'

export function addSectionStyle(styles){
  console.log(styles)
  return { type: types.ADD_SECTION_STYLE, styles }
}