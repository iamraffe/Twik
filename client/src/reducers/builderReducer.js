import * as types from '../actions/actionTypes'
import initialState from './initialState'
import moment from 'moment'
import _ from 'lodash'

export default function builderReducer(state = initialState.report, action){
  switch(action.type){
    case "SELECT_REPORT_MODE":
      return {
        ...state,
        mode: action.mode
      }
    case types.CREATE_REPORT_SUCCESS:
      return {...state,
              ...action.annualReport,
                  content: JSON.parse(action.annualReport.content),
                  created_at: moment(action.annualReport.created_at),
                  updated_at: moment(action.annualReport.updated_at),
                  size: _.reduce(_.map(JSON.parse(action.annualReport.content), (section, index) => {
                          return section.elements.length
                        }),(sum, n) => {return sum+n} , 0)
                }
    case types.LOAD_REPORT_DATA_SUCCESS:
      return {...state,
              ...action.annualReport,
                  content: JSON.parse(action.annualReport.content),
                  created_at: moment(action.annualReport.created_at),
                  updated_at: moment(action.annualReport.updated_at),
                  size: _.reduce(_.map(JSON.parse(action.annualReport.content), (section, index) => {
                          return section.elements.length
                        }),(sum, n) => {return sum+n} , 0)
                }
    case types.SAVE_REPORT_SUCCESS:
    // console.log(action.annualReport)
      return {...state,
              ...action.annualReport,
                  content: JSON.parse(action.annualReport.content),
                  created_at: moment(action.annualReport.created_at),
                  updated_at: moment(action.annualReport.updated_at),
                  size: _.reduce(_.map(JSON.parse(action.annualReport.content), (section, index) => {
                          return section.elements.length
                        }),(sum, n) => {return sum+n} , 0)
                }
    case types.ADD_SECTION:
      return {
        ...state,
        content: [
          ...state.content.slice(0, action.index+1),
          {
            title: "Double-Click to Add Title",
            elements: []
          },
          ...state.content.slice(action.index+1)
        ]
      }
    case "REMOVE_SECTION":
      return {
        ...state,
        content: [
          ...state.content.slice(0, action.index),
          ...state.content.slice(action.index+1)
        ]
      }
    case "ADD_TEXT_ELEMENT":
      return {
        ...state,
        size: state.size+1,
        content: [
          ...state.content.slice(0, action.sectionIndex),
          {
            ...state.content[action.sectionIndex],
            elements: [
              ...state.content[action.sectionIndex].elements,
              {
                id: state.size,
                type: "TEXT_ELEMENT",
                title: "Double-Click to Add Title",
                text: "Quick brown fox jumps over the lazy dog"
              }
            ]
          },
          ...state.content.slice(action.sectionIndex+1)
        ]
      }
    case "ADD_CHART_ELEMENT":
      return {
        ...state,
        size: state.size+1,
        content: [
          ...state.content.slice(0, action.sectionIndex),
          {
            ...state.content[action.sectionIndex],
            elements: [
              ...state.content[action.sectionIndex].elements,
              {
                id: state.size,
                type: "CHART_ELEMENT",
                entries: action.chart.entries,
                interventions: action.chart.interventions,
                chartType: action.chart.type,
                user: action.chart.user
              }
            ]
          },
          ...state.content.slice(action.sectionIndex+1)
        ]
      }
    case "UPDATE_SECTION_CONTAINER":
      // console.log("UPDATE SECTION CONTAINER => ", action)
      return {
        ...state,
        content: [
          ...state.content.slice(0, action.sectionContainer.index),
           Object.assign({}, state.content[action.sectionContainer.index], action.sectionContainer),
          ...state.content.slice(action.sectionContainer.index+1)
        ]
      }
    case "LOAD_CHARTS_SUCCESS":
      return Object.assign({}, state, {charts: action.charts})
    case "LOAD_VAXX_SUCCESS":
      return Object.assign({}, state, {vaccinations: action.vaxx})
    case "ADD_DOSE_SUCCESS":
      let index = _.findIndex(state.vaccinations, (v, i) => {return v.id === action.dose.vaccination_id })
      return {
        ...state,
        vaccinations: [
          ...state.vaccinations.slice(0, index),
           Object.assign({}, state.vaccinations[index], {doses: _.concat(state.vaccinations[index].doses, [action.dose])}),
          ...state.vaccinations.slice(index+1)
        ]
      }
    case "UPDATE_DOSE_SUCCESS":
      let ind = _.findIndex(state.vaccinations, (v, i) => {return v.id === action.dose.vaccination_id })
      let doseIndex = _.findIndex(state.vaccinations[ind].doses, (d, i) => {return d.id === action.dose.id })
      console.log(ind, doseIndex)
      // debugger;
      return {
        ...state,
        vaccinations: [
          ...state.vaccinations.slice(0, ind),
           Object.assign({}, state.vaccinations[ind], {doses: [
              ...state.vaccinations[ind].doses.slice(0, doseIndex),
              Object.assign({}, state.vaccinations[ind].doses[doseIndex], action.dose),
              ...state.vaccinations[ind].doses.slice(doseIndex+1)
           ]}),
          ...state.vaccinations.slice(ind+1)
        ]
      }
    case "UPDATE_VAXX_SUCCESS":
      let vaxxIndex = _.findIndex(state.vaccinations, (v, i) => {return v.id === action.vaxx.id })
      return {
        ...state,
        vaccinations: [
          ...state.vaccinations.slice(0, vaxxIndex),
           Object.assign({}, state.vaccinations[vaxxIndex], action.vaxx),
          ...state.vaccinations.slice(vaxxIndex+1)
        ]
      }
    default:
      return state
  }
}
