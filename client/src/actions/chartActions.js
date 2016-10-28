import * as types from './actionTypes'
import API from '../api/api'

export function selectUser(user){
  return { type: types.SELECT_USER, user }
}

export function selectData(entries){
  return { type: types.SELECT_DATA, entries }
}

export function selectTypeAndSymbols(type){
  return { type: types.SELECT_TYPE_AND_SYMBOLS, chartType: type }
}

export function selectIntervention(intervention){
  return { type: types.SELECT_INTERVENTION, intervention }
}

export function removeIntervention(index){
  return { type: "REMOVE_INTERVENTION", index }
}


export function updateIntervention(intervention){
  return { type: types.UPDATE_INTERVENTION, intervention }
}

export function editEntryDateData(date, index){
  return { type: types.EDIT_ENTRY_DATE_DATA, date, index }
}

export function editEntryValueData(value, index){
  return { type: types.EDIT_ENTRY_VALUE_DATA, value, index }
}

export function confirmChartSuccess(chart){
  return { type: types.CONFIRM_CHART_SUCCESS, chart }
}

export function chartCompleted(){
  return { type: "CHART_COMPLETED" }
}

export function chartReset(){
  return { type: "CHART_RESET" }
}

//THUNKS ALWAYS AT THE BOTTOM
export function confirmChart(chart){
  return dispatch => {
    return API.post(`/users/${chart.user.id}/charts`, chart).then((chart) =>{
      console.log(chart)
      dispatch(confirmChartSuccess(chart))
    })
    .catch((error) => {
      throw(error)
    })
  }
}
