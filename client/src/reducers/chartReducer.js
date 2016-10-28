import * as types from '../actions/actionTypes'
import initialState from './initialState'
import { chartTypes } from '../components/charts/common/utils'

export default function chartReducer(state = initialState.chart, action){
  switch(action.type){
    case types.LOAD_INTERVENTIONS_SUCCESS:
      return Object.assign({}, state, {interventions: _.map(action.interventions, (intervention) => {
              return {
                  ...intervention,
                  start: d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse(intervention.start),
                  end: d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse(intervention.end)
                }
              })
            })
    case types.SELECT_TYPE_AND_SYMBOLS:
      return Object.assign({}, state, {type: action.chartType, symbols: chartTypes[action.chartType].symbols})
    case types.SELECT_USER:
      return Object.assign({}, state, {user: action.user})
    case types.SELECT_DATA:
      // console.log("SELECT DATA => ", state, action)
      return Object.assign({}, state, {entries: action.entries})
    case types.SELECT_INTERVENTION:
      // console.log("SELECT INTERVENTION => ", state, action)
      return Object.assign({}, state, {interventions: _.concat(state.interventions, action.intervention)})
    case types.UPDATE_INTERVENTION:
      return Object.assign({}, state, {interventions:
                                        [
                                          ...state.interventions.slice(0, action.intervention.index),
                                          Object.assign({}, state.interventions[action.intervention.index], action.intervention),
                                          ...state.interventions.slice(action.intervention.index+1)
                                        ]
                                      }
                          )
    case types.CONFIRM_CHART_SUCCESS:
      // console.log("CONFIRM CHART => ", state, action.chart, Object.assign({}, state, {id: action.chart.id}))
      return Object.assign({}, state, {id: action.chart.id, completed: true})
      // return state
    case types.LOAD_ENTRIES_SUCCESS:
      return Object.assign({}, state, {entries: action.entries})
    case types.EDIT_ENTRY_DATE_DATA:
      return Object.assign(
                            {},
                            state,
                            {
                              entries: [
                                ...state.entries.slice(0, action.index),
                                Object.assign({}, state.entries[action.index], {date: action.date}),
                                ...state.entries.slice(action.index + 1)
                              ]
                            }
                          )

    case types.EDIT_ENTRY_VALUE_DATA:
      return Object.assign(
                            {},
                            state,
                            {
                              entries: [
                                ...state.entries.slice(0, action.index),
                                Object.assign({}, state.entries[action.index], {value: action.value}),
                                ...state.entries.slice(action.index + 1),
                              ]
                            }
                          )
    case "REMOVE_INTERVENTION":
      // console.log("REMOVE INTERVENTION ON REDUCER => ", action.index, state)
      return Object.assign({}, state, {interventions:
                                        [
                                          ...state.interventions.slice(0, action.index),
                                          ...state.interventions.slice(action.index+1)
                                        ]
                                      }
                          )
    case "CHART_COMPLETED":
      return Object.assign({}, state, {completed: true})
    case "CHART_RESET":
      return Object.assign({}, initialState.chart, {user: state.user})
    case "ADD_CHART_ELEMENT":
      return Object.assign({}, state, {id: action.id, section: action.sectionIndex})
    default:
      return state
  }
}
