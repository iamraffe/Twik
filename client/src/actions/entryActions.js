import * as types from './actionTypes'
import API from '../api/api'
import moment from 'moment'
import _ from 'lodash'

export function loadEntriesSuccess(entries){
  return { type: types.LOAD_ENTRIES_SUCCESS, entries}
}

//THUNKS ALWAYS AT THE BOTTOM
export function loadEntries(userId, chartType){
  return dispatch => {
    return API.get(`/users/${userId}/charts/${chartType}/entries`).then((entries) =>{
      // console.log("ENTRIES => ", entries)
      dispatch(loadEntriesSuccess(_.map(entries, (entry) => {
        return Object.assign({}, entry, {date: moment(entry.date)})
      })))
    })
    .catch((error) => {
      throw(error)
    })
  }
}
