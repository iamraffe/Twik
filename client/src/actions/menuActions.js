import * as types from './actionTypes'

export function setWildcardsInfo(wildcards){
  return { type: types.SET_WILDCARDS_INFO, wildcards }
}
