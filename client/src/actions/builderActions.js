import * as types from './actionTypes'
import API from '../api/api'
import moment from 'moment'

export function loadReportDataSuccess(annualReport){
  return { type: types.LOAD_REPORT_DATA_SUCCESS, annualReport }
}

export function saveReportSuccess(annualReport){
  return { type: types.SAVE_REPORT_SUCCESS, annualReport }
}
export function createReportSuccess(annualReport){
  return { type: types.CREATE_REPORT_SUCCESS, annualReport }
}

export function addSection(index){
  return { type: types.ADD_SECTION, index }
}

export function removeSection(index){
  return { type: "REMOVE_SECTION", index }
}

export function addTextElement(sectionIndex, id){
  return { type: "ADD_TEXT_ELEMENT", sectionIndex, id }
}

export function updateSectionContainer(sectionContainer){
  // console.log("SECTIONCONTAINER ?> ", sectionContainer)
  return { type: "UPDATE_SECTION_CONTAINER", sectionContainer }
}

export function loadChartsSuccess(charts){
  return { type: "LOAD_CHARTS_SUCCESS", charts }
}

export function addChartElement(sectionIndex, id, chart){
  return { type: "ADD_CHART_ELEMENT", sectionIndex, id, chart }
}

export function selectReportMode(mode){
  return { type: "SELECT_REPORT_MODE", mode }
}

export function loadVaxxSuccess(vaxx){
  return { type: "LOAD_VAXX_SUCCESS", vaxx }
}

export function addDoseSuccess(dose){
  return { type: "ADD_DOSE_SUCCESS", dose }
}

export function updateDoseSuccess(dose){
  return { type: "UPDATE_DOSE_SUCCESS", dose }
}

export function updateVaxxSuccess(vaxx){
  return { type: "UPDATE_VAXX_SUCCESS", vaxx }
}

//THUNKS ALWAYS AT THE BOTTOM
export function loadReportData(userId, year){
  const reportId = year === undefined ? moment().year() : year
  // console.log("REPORT ID => ", reportId, userId, year)
  return dispatch => {
    return API.get(`/users/${userId}/annual_reports/${reportId}`).then((response) =>{
      // console.log(response)
      dispatch(loadReportDataSuccess(response))
    })
    .catch((error) => {
      throw(error)
    })
  }
}

export function saveReport(rawReport){
  let annualReport = {
    annual_report:  Object.assign({}, rawReport, {intro: rawReport.intro, content: JSON.stringify(rawReport.content)})
  }
  return dispatch => {
    return API.put(`/users/${rawReport.user_id}/annual_reports/${rawReport.id}`, annualReport).then((annualReport) =>{
      // console.log(response)
      dispatch(saveReportSuccess(annualReport))
    })
    .catch((error) => {
      throw(error)
    })
  }
}

function setContent(pediatric){
  if(pediatric !== true){
    return [
      {
        index: 1,
        title:"Active Issues",
        elements: []
      },
      {
        index: 2,
        title:"Stable Issues",
        elements: []
      },
      {
        index: 3,
        title:"Prevention",
        elements: []
      },
      {
        index: 4,
        title:"Action List",
        elements: []
      }
    ]
  }
  else{
    return [
      {
        index: 1,
        title:"Active Issues",
        elements: []
      },
      {
        index: 2,
        title:"Growth",
        elements: []
      },
      {
        index: 3,
        title:"Prevention and Health Maintenance",
        elements: []
      },
      {
        index: 4,
        title:"Inmunization Record",
        elements: []
      },
      {
        index: 5,
        title:"Developmental Milestones and Anticipatory Guidance",
        elements: []
      },
      {
        index: 6,
        title:"Action List",
        elements: []
      }
    ]
  }
}

export function newReport(userExt, year){
  return dispatch => {
    return API.get(`/users/${userExt}`).then((user) =>{
      console.log(setContent(user.pediatric))
      let content = JSON.stringify(setContent(user.pediatric))
      let annualReport = {
        annual_report:  {
          year,
          content,
          intro: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        }
      }
      dispatch(createReport(annualReport, userExt))
    })
    .catch((error) => {
      throw(error)
    })
  }
}

export function createReport(annualReport, userExt){
  return dispatch => {
    return API.post(`/users/${userExt}/annual_reports`, annualReport).then((annualReport) =>{
      dispatch(createReportSuccess(annualReport))
    })
    .catch((error) => {
      throw(error)
    })
  }
}

export function loadCharts(userExt){
  return dispatch => {
    return API.get(`/users/${userExt}/charts`).then((charts) =>{
      // console.log(charts)
      dispatch(loadChartsSuccess(charts))
    })
    .catch((error) => {
      throw(error)
    })
  }
}

export function loadVaxx(userExt){
  return dispatch => {
    return API.get(`/users/${userExt}/vaccinations`).then((vaxx) =>{
      dispatch(loadVaxxSuccess(vaxx))
    })
    .catch((error) => {
      throw(error)
    })
  }
}

export function addDose(dose){
  return dispatch => {
    return API.post(`/doses`, {dose}).then((dose) =>{
      dispatch(addDoseSuccess(dose))
    })
    .catch((error) => {
      throw(error)
    })
  }
}

export function updateDose(dose){
  return dispatch => {
    return API.put(`/doses/${dose.id}`, {dose}).then((dose) =>{
      console.log(dose)
      dispatch(updateDoseSuccess(dose))
    })
    .catch((error) => {
      throw(error)
    })
  }
}

export function updateVaxx(vaccination){
  return dispatch => {
    return API.put(`/vaccinations/${vaccination.id}`, {vaccination}).then((vaccination) =>{
      console.log(vaccination)
      dispatch(updateVaxxSuccess(vaccination))
    })
    .catch((error) => {
      throw(error)
    })
  }
}

export function destroyVaxx(id, ext){
  return dispatch => {
    return API.delete(`/vaccinations/${id}`).then((vaccination) =>{
      console.log(vaccination)
      dispatch(loadVaxx(ext))
    })
    .catch((error) => {
      throw(error)
    })
  }
}

