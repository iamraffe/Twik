import * as types from '../actions/actionTypes'
import initialState from './initialState'
import d3 from 'd3'

export default function interventionReducer(state = initialState.interventions, action){
  switch(action.type){
    case types.LOAD_INTERVENTIONS_SUCCESS:
      return _.map(action.interventions, (intervention) => {
        return {
          ...intervention,
          start: d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse(intervention.start),
          end: d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse(intervention.end)
        }
      })
    case types.SELECT_INTERVENTION:
      return [
        ...state,
        Object.assign({}, action.intervention, {start: d3.time.format("%x").parse(action.intervention.start), end: d3.time.format("%x").parse(action.intervention.end)})
      ]
    case types.UPDATE_INTERVENTION:
      return [
        ...state.slice(0, action.intervention.index),
        Object.assign({}, state[action.intervention.index], Object.assign({}, action.intervention, {start: d3.time.format("%x").parse(action.intervention.start), end: d3.time.format("%x").parse(action.intervention.end)})),
        ...state.slice(action.intervention.index+1)
      ]
    case "REMOVE_INTERVENTION":
      console.log("REMOVE INTERVENTION ON OTHER REDUCER => ", action.index, state)
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index+1)
      ]
    default:
      return state
  }
}
