import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toastr from 'toastr'
import {Motion, spring} from 'react-motion'
import _ from 'lodash'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import moment from 'moment'
import getFormData from 'get-form-data'
import jsPDF from 'jspdf'

import API from '../../api/api'
import '../../styles/builder.scss'
import { months } from '../charts/common/utils'

import * as builderActions from '../../actions/builderActions'
import * as chartActions from '../../actions/chartActions'
import * as interventionActions from '../../actions/interventionActions'
import * as entryActions from '../../actions/entryActions'
import * as engineActions from '../../actions/engineActions'

import SectionContainer from '../sections/SectionContainer'
import DataGrid from '../selectData/DataGrid'
import InterventionForm from '../selectCustomizations/InterventionForm'
import InterventionList from '../common/InterventionList'
import Box from '../Box'
import Editor from '../sections/Editor'
import SectionsMenu from '../sections/SectionsMenu'
import BuilderSidebar from '../sections/BuilderSidebar'
import BuilderPanel from './BuilderPanel'
import VaccinationPanel from './VaccinationPanel'

  const style = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: `auto`,
    backgroundColor: '#ECE8E5',
    padding: '0 15px',
    borderTop: '2.5px solid black',
    zIndex: 99999
  }

function scrollTo(element, to, duration) {
  console.log("SCROLL TOP => ", element.scrollTop)
  // debugger;
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    top.window.scroll(0, element.scrollTop + perTick)
    // element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

@DragDropContext(HTML5Backend)
class Builder extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      report: props.report,
      editingIntro: false,
      activeSection: 'report-intro',
      activeSectionIndex: 0,
      blockSave: false,
      suggestions: [],
      value: '',
      step: 'inactive',
      chartType: null,
      interventions: props.interventions,
      entries: props.entries,
      chart: props.chart,
      addedElement: {
        id: null,
        index: null
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.chart.completed){
      this.onChartClean(true)
    }
    this.setState({
      report: nextProps.report,
      interventions: nextProps.chart.interventions,
      entries: nextProps.chart.entries,
      inputRowLength: nextProps.chart.entries.length+1,
      chart: {
        ...this.state.chart,
        ...nextProps.chart
      }
    })
  }

  checkActiveElement = () => {
    const { content } = this.state.report
    const active = _.filter(_.concat([{title: "report-intro", index: -1}], content), (section, index) => {
      const el = document.getElementById(section.title).getBoundingClientRect()
      return (el.top >= 0 && el.top <= window.pageYOffset) || (el.top+el.height > 0 && (el.top+(el.height/2))>window.pageYOffset && (el.top < (window.innerHeight/2)))
    })
    this.setState({
      activeSection: active[0].title,
      activeSectionIndex: active[0].index + 1
    })
  }

  componentDidMount(){
    if(this.props.report.mode === "patient"){
      window.addEventListener('scroll', this.checkActiveElement)
    }

    this.loadReportInfo()
    // window.history.replaceState({}, document.title, location.protocol + "//" + location.host + location.pathname)
  }

  loadReportInfo = () => {
    const { ext, type, mode, year } = this.props

    this.props.actions.loadCharts(ext)
    this.props.actions.loadVaxx(ext)
    this.props.actions.selectReportMode(mode)
    if(type !== "new"){
      this.props.actions.loadReportData(ext, year)
    }
    else{
      this.props.actions.newReport(ext, year)
    }
  }

  componentWillUnmount(){
    if(this.props.report.mode === "patient"){
      window.removeEventListener('scroll', this.checkActiveElement)
    }
  }

  editIntro = (e) => {
    this.setState({
      report: {
        ...this.state.report,
        intro: e
      }
    })
  }

  toggleEditIntro = () => {
    this.setState({
      editingIntro: !this.state.editingIntro
    })
  }

  saveReport = () => {
    const { report } = this.state
    if(!this.state.blockSave){
      this.props.actions.saveReport(report)
      toastr.success('The report has been saved correctly', 'Success')
    }
    else{
      toastr.error("You've created and placed a chart that hasn't been saved. Please save the chart before saving the report")
    }
  }

  createNewSection = () => {
    const { content } = this.state.report
    this.props.actions.addSection(content.length-2)
  }

  onSectionContainerDelete = (index) => {
    this.props.actions.removeSection(index)
  }

  onSectionUp = () => {
    const { activeSectionIndex, report, activeSection } = this.state

    if(activeSectionIndex === 1){
      this.setState({
        activeSectionIndex: 0,
        activeSection: "report-intro"
      })
      window.location.href = "#report-intro"
    }
    else{
      const title = report.content[activeSectionIndex-2].title
      this.setState({
        activeSectionIndex: activeSectionIndex - 1,
        activeSection: title
      })
      window.location.href = `#${title}`
    }
  }

  onSectionDown = () => {
    const { activeSectionIndex, report, activeSection } = this.state

    if(activeSectionIndex === report.content.length){
      this.setState({
        activeSectionIndex: 0,
        activeSection: "report-intro"
      })
      window.location.href = "#report-intro"
    }
    else{
      const title = report.content[activeSectionIndex].title
      this.setState({
        activeSectionIndex: activeSectionIndex + 1,
        activeSection: title
      })
      window.location.href = `#${title}`
    }
  }

  onPublishReport = () => {
    const { report } = this.state

    if(report.id !== null){
      API.put(`/users/${report.user.id}/annual_reports/${report.id}`, {annual_report: {published: true}})
      .then(response =>
        toastr.success("Your report has been published and it's now visible", "Success!")
      )
    }
    else{
      toastr.error("You need to save the report before continuing")
    }
  }

  getCleanFormData = (form) => {
    const { symbols } = this.state.chart
    let data = getFormData(form)
    // console.log(data)
    let formData = []
    let index = 0
    _.forEach(data, (input, key)=> {
      if(input === "" || input === "undefined"){
        delete data[key]
      }
      else{
        formData[index] = {date: null, value: null, id: null, symbol: null}
        _.each(symbols, (s, i) => {
          if(key.indexOf(`entry--${s}`) != -1){
            formData[index]["value"] = parseFloat(input)
            formData[index]["symbol"] = s
            formData[index]["date"] = d3.time.format("%x").parse(data[`date--${key.split('--')[2]}`]).toISOString()
            formData[index]["id"] = data[`id--${s}--${key.split('--')[2]}`]
            index++
          }
        })
      }
    })
    return _.sortBy(formData, function(entry) {return entry.date})
  }

  onDataSelected = (e) => {
    e.preventDefault()

    const formData = this.getCleanFormData(document.getElementById('data-grid'))
    this.props.chartActions.selectData(formData)
    const sectionIndex = this.state.chart.section
    const id = this.state.chart.id

    console.log(formData, sectionIndex, id)
    // debugger;
    const report = {
      ...this.state.report,
      content: [
        ...this.state.report.content.slice(0, sectionIndex),
        Object.assign({}, this.state.report.content[sectionIndex], {elements: [
            ...this.state.report.content[sectionIndex].elements.slice(0, id),
            Object.assign({}, this.state.report.content[sectionIndex].elements[id], {entries: formData}),
            ...this.state.report.content[sectionIndex].elements.slice(id+1),
          ]}),
        ...this.state.report.content.slice(sectionIndex+1)
      ]
    }

    this.props.actions.updateSectionContainer({
      index: sectionIndex,
      title: report.content[sectionIndex].title,
      elements: report.content[sectionIndex].elements
    })

    this.setState({
      step: 'interventions',
      report: report
    })
  }

  onEntryEdited = (e) => {
    const inputType = e.target.type
    const index = parseInt(e.target.getAttribute('id'))
    if(inputType === "number"){
      const value = parseFloat(e.target.value)
      if(this.state.entries[index] && value !== this.state.entries[index].value){
        this.onEntryValueChange(value, index)
      }
    }
    else{
      const date = moment(e.target.value, "MM/DD/YYYY")
      if(this.state.entries[index] && date !== this.state.entries[index].date){
        this.onEntryDateChange(date, index)
      }
    }
    // debugger;
    const formData = this.getCleanFormData(document.getElementById('data-grid'))
    console.log(formData)

    // this.props.chartActions.selectData(formData)
    const sectionIndex = this.state.chart.section
    const id = this.state.chart.id

    console.log(formData, sectionIndex, id)
    // debugger;
    const report = {
      ...this.state.report,
      content: [
        ...this.state.report.content.slice(0, sectionIndex),
        Object.assign({}, this.state.report.content[sectionIndex], {elements: [
            ...this.state.report.content[sectionIndex].elements.slice(0, id),
            Object.assign({}, this.state.report.content[sectionIndex].elements[id], {entries: formData}),
            ...this.state.report.content[sectionIndex].elements.slice(id+1),
          ]}),
        ...this.state.report.content.slice(sectionIndex+1)
      ]
    }

    this.props.actions.updateSectionContainer({
      index: sectionIndex,
      title: report.content[sectionIndex].title,
      elements: report.content[sectionIndex].elements
    })

    this.setState({
      report
    })
  }

  onEntryDateChange = (newDate, index) => {
    console.log("STATE CHART => ", this.state.chart)
    this.props.chartActions.editEntryDateData(newDate, index)
  }

  onEntryValueChange = (newValue, index) => {
    console.log("STATE CHART => ", this.state.chart)
    this.props.chartActions.editEntryValueData(newValue, index)
  }

  onChartSectionSelect = (index, size) => {
    const chart = {
      type: this.state.chart.type,
      entries: _.map(this.state.chart.entries, (entry) => {
        return {
          ...entry,
          date: entry.date.toISOString()
        }
      }),
      interventions: this.state.chart.interventions,
      user: this.state.chart.user,
      section: index,
      id: size
    }

    this.setState({
      step: 'data',
      blockSave: true,
      addedElement: {id: size, index}
    })

    this.props.actions.addChartElement(index, size, chart)
    this.onElementAdded(size, index)
    // scrollTo(document.getElementById(`svg-linechart-wrapper-${index}-${size}`), 0, 600)
  }

  onTextSectionSelect = (index, size) => {
    this.setState({
      step: 'inactive',
      addedElement: {id: size, index}
    })

    this.props.actions.addTextElement(index, size)
    // scrollTo(document.getElementById(`text-element-${index}-${size}`), 0, 600)
  }

  onInterventionCreate = (formData) => {
    const sectionIndex = this.state.chart.section
    const id = this.state.chart.id

    this.props.chartActions.selectIntervention(formData)

    const report = {
      ...this.state.report,
      content: [
        ...this.state.report.content.slice(0, sectionIndex),
        Object.assign({}, this.state.report.content[sectionIndex], {elements: [
            ...this.state.report.content[sectionIndex].elements.slice(0, id),
            Object.assign({}, this.state.report.content[sectionIndex].elements[id], {interventions: _.concat(this.state.interventions, formData)}),
            ...this.state.report.content[sectionIndex].elements.slice(id+1),
          ]}),
        ...this.state.report.content.slice(sectionIndex+1)
      ]
    }

    this.props.actions.updateSectionContainer({
      index: sectionIndex,
      title: report.content[sectionIndex].title,
      elements: report.content[sectionIndex].elements
    })
    const clickedButton = document.activeElement.getAttribute('name')
    this.setState({
      step: clickedButton ===  'continue' ? 'interventions' : 'confirmation',
      report: report
    })

  }

  onEditIntervention = (type, index) => {
    const { interventions, intervention } = this.state

    let toBeEdited = _.filter(interventions, {type: "Medication"})[index]
    toBeEdited.start = moment(toBeEdited.start)
    toBeEdited.end = moment(toBeEdited.end)
    toBeEdited = {
      ...toBeEdited,
      edit: true,
      index: index
    }

    this.setState({
      isOpened: true,
      intervention: Object.assign({}, intervention, toBeEdited)
    })
  }

  onInterventionUpdate = (e) => {
    e.preventDefault()
    const clickedButton = document.activeElement.getAttribute('name')
    const form = document.getElementById('intervention-create')
    const formData = getInterventionFormData(form)

    if(this.canSubmitInterventionForm(formData)){
      this.props.chartActions.updateIntervention(formData)
      form.reset()
      this.setState({
        intervention: {
          id: null,
          title: null,
          description: null,
          active: false,
          edit: false,
          start: moment(),
          end: moment().add(1, 'days'),
        }
      })
    }
    else{
      toastr.error("Need more intervention data")
    }
  }

  onDeleteIntervention = (type, index) => {
    const { interventions } = this.state
    this.props.chartActions.removeIntervention(index)
    this.setState({
      interventions: [
        ..._.filter(interventions, {type: "Medication"}).slice(0, index),
        ..._.filter(interventions, {type: "Medication"}).slice(index+1)
      ]
    })
  }

  onSetStep = (step) => {
    this.setState({
      step
    })
  }

  onChartConfirmation = () => {
    this.setState({
      blockSave: false,
      step: 'inactive'
    })
    const { chart } = this.state
    this.props.chartActions.confirmChart({
      ...chart,
      type: chart.type.replace(/\s+/g, '')
    })
  }

  onChartTypeSelected = (suggestion) => {
    const chartType = suggestion.replace(/\s+/g, '')
    const { user } = this.state.report

    this.setState({
      step: 'section'
    })

    this.props.chartActions.selectTypeAndSymbols(chartType)
    this.props.interventionActions.loadInterventions(user.id)
    this.props.entryActions.loadEntries(user.id, chartType)
    this.props.chartActions.selectUser(user)
    this.props.engineActions.selectEngineMode('inception')
  }

  onChartCompleted = () => {
    const { chart } = this.state
    const { ext } = this.props

    this.props.chartActions.confirmChart(chart)
    this.props.actions.loadCharts(ext)
  }

  onChartClean = (completed) => {
    this.onSetStep('inactive')
    this.props.chartActions.chartReset()

    if(!completed){
      const sectionIndex = this.state.chart.section
      const id = this.state.chart.id
      const report = {
        ...this.state.report,
        content: [
          ...this.state.report.content.slice(0, sectionIndex),
          Object.assign({}, this.state.report.content[sectionIndex], {elements: [
              ...this.state.report.content[sectionIndex].elements.slice(0, id),
              ...this.state.report.content[sectionIndex].elements.slice(id+1),
            ]}),
          ...this.state.report.content.slice(sectionIndex+1)
        ]
      }

      this.props.actions.updateSectionContainer({
        index: sectionIndex,
        title: report.content[sectionIndex].title,
        elements: report.content[sectionIndex].elements
      })
      this.setState({
        blockSave: false,
        report
      })
    }
    else{
      this.setState({
        blockSave: false
      })
    }
  }

  onElementAdded = (id, index) => {
    console.log(id, index)
    this.setState({
      addedElement: {
        id,
        index
      }
    })
  }

  componentDidUpdate(){
    const aE = document.getElementById(`section-element-${this.state.addedElement.index}-${this.state.addedElement.id}`)
    if(aE!==null){
      aE.scrollIntoView({block: "end", behavior: "smooth"})
      this.setState({
        addedElement: {
          id: null,
          index: null
        }
      })
    }
  }

  panelOpenState = (step) => {
    return step !== 'inactive' && step !== 'vaxx'
  }

  onVaxxCreate = () => {

  }

  onAddDose = (dose) => {
    this.props.actions.addDose(dose)
  }

  onUpdateDose = (dose) => {
    this.props.actions.updateDose(dose)
  }

  onUpdateVaxx = (vaxx) => {
    this.props.actions.updateVaxx(vaxx)
  }

  onDeleteVaxx = (vaxx) => {
    const { ext } = this.props
    this.props.actions.destroyVaxx(vaxx, ext)
  }

  render(){
    let { children, actions, mode } = this.props
    const { report, editingIntro, chartType, chart, entries, step, interventions } = this.state

    if(report.id !== null){
      return(
        <div>
          <section className="row editor">
            {this.props.editor[0] && <h1 className="last-edited-by">Last edited by {`${this.props.editor[0]} ${this.props.editor[1]}`}</h1>}
          </section>
          <section className="row builder-canvas">
            <div style={{position: 'fixed', left: 0, right: 0, zIndex: step !== 'vaxx' ? 0 : 999}}>
              <div className="container">
                <div className="row">
                  <VaccinationPanel
                    step={step}
                    user={report.user}
                    vaccinations={report.vaccinations}
                    onAddDose={this.onAddDose}
                    onUpdateDose={this.onUpdateDose}
                    onUpdateVaxx={this.onUpdateVaxx}
                    onDeleteVaxx={this.onDeleteVaxx}
                    onVaxxCreate={this.onVaxxCreate}
                    onSetStep={this.onSetStep}
                  >
                  </VaccinationPanel>
                </div>
                <div className="col-sm-3">
                  <Motion style={{x: spring(this.panelOpenState(step) ? 0 : 110), opacity: spring(this.panelOpenState(step) ? 1 : 0)}}>
                    {({x, opacity}) =>
                      <div className="row toolbox-panel" style={{
                        WebkitTransform: `translateX(${x}%)`,
                        transform: `translateX(${x}%)`,
                        opacity: opacity,
                        paddingTop: 15
                      }}>
                        <span className="fa-stack close-toolbox fa-lg" onClick={() => { this.onChartClean(true) }}>
                          <i className="fa fa-circle fa-stack-2x"></i>
                          <i className="fa fa-times fa-stack-1x fa-inverse"></i>
                        </span>
                        <BuilderPanel
                          mode={mode}
                          step={step}
                          chart={chart}
                          entries={entries}
                          interventions={interventions}
                          report={report}
                          onSetStep={this.onSetStep}
                          onElementAdded={this.onElementAdded}
                          onTextSectionSelect={this.onTextSectionSelect}
                          onChartTypeSelected={this.onChartTypeSelected}
                          onChartSectionSelect={this.onChartSectionSelect}
                          onDataSelected={this.onDataSelected}
                          onInterventionCreate={this.onInterventionCreate}
                          onInterventionUpdate={this.onInterventionUpdate}
                          onChartCompleted={this.onChartCompleted}
                          onEntryDateChange={this.onEntryDateChange}
                          onEntryValueChange={this.onEntryValueChange}
                        />
                      </div>
                    }
                  </Motion>
                </div>
              </div>
            </div>
            <Motion style={{x: spring(this.panelOpenState(step) ? 22.5 : 0), paddingLeft: spring(this.panelOpenState(step) ? 2.5 : 25)}}>
              {({x, paddingLeft}) =>
                <div style={{
                  position: 'relative'
                }}>
                  <div
                    className="col-sm-6 col-sm-offset-3 col-xs-12"
                    style={{
                      position: 'relative',
                      minHeight: '650px',
                      background: '#fff',
                      display: 'block',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.45)',

                    }}
                  >
                    <div className="drop-zone">
                      <section id={`report-intro`} className="section-container report-intro group">
                        <div className="panel panel-primary">
                          <header className="panel-heading row">
                            <div className="col-sm-8">
                              {(report.mode === "patient") && <h1 className="panel-title section-container-title">{`${report.user.first_name} ${report.user.last_name}`}</h1>}
                              {(report.mode !== "patient") && <h1 className="panel-title section-container-title"><a href={`/users/${report.user.id}`}>{`${report.user.first_name} ${report.user.last_name}`}</a></h1>}
                            </div>
                            <div className="col-sm-4">
                              <h2>
                                Private Medical Annual report
                              </h2>
                              <hr style={{borderColor: '#E6E5E1'}} />
                              <h3>
                                {`${months[moment(report.updated_at).month()]}, ${moment(report.updated_at).year()}`}
                              </h3>
                            </div>
                          </header>
                          <section style={{paddingLeft: '15px', paddingRight: '15px'}}>
                            <div className="text-element-wrapper" style={{borderBottom: 'none'}}>
                              <p>{`Dear ${report.user.first_name},`}</p>
                              { !editingIntro &&
                                <p
                                  ref="title"
                                  onDoubleClick={() => {
                                    if(report.mode !== "patient") this.toggleEditIntro()
                                  }}
                                  dangerouslySetInnerHTML={{__html: report.intro}}
                                />
                              }
                              { editingIntro &&
                                <div className="editingIntro">
                                  <Editor
                                    content={report.intro}
                                    placeholder={report.intro}
                                    onChange={this.editIntro}
                                    onKeyDown={this.toggleEditIntro}
                                    fastMode={false}
                                  />
                                </div>
                              }
                            </div>
                          </section>
                        </div>
                      </section>
                      {_.map(report.content, (section, index) => {
                        return <SectionContainer
                                key={index}
                                title={section.title}
                                elements={section.elements}
                                chart={chart}
                                index={index}
                                size={report.size}
                                mode={report.mode}
                                onDelete={this.onSectionContainerDelete}
                                onSetStep={this.onSetStep}
                              />
                      })}
                    </div>
                  </div>
                  <div className="col-md-2 hidden-xs hidden-sm" style={{paddingLeft: 25}}>
                  {(report.mode !== "patient") &&
                    <div className="actions-group vertical" style={{position: 'fixed'}}>
                      <button type="button" className="btn btn-dark" onClick={this.saveReport} data-toggle="tooltip" data-placement="top" title="SAVE">
                        <span className="glyphicon glyphicon-floppy-disk"></span>
                      </button>
                      <button id="insertTextArea" type="button" className="btn btn-dark" onClick={this.createNewSection} data-toggle="tooltip" data-placement="top" title="ADD NEW SECTION">
                        <span className="glyphicon glyphicon-copy " id="insertTextArea"></span>
                      </button>
                      <Box
                        onSetStep={this.onSetStep}
                        onElementAdded={this.onElementAdded}
                      />
                      <button type="button" className="btn btn-dark"  onClick={() => {this.onSetStep('chartType')}} data-toggle="tooltip" data-placement="top" title="ADD GRAPH" >
                        <span className="glyphicon glyphicon-stats"></span>
                      </button>
                      <button type="button" className="btn btn-dark" onClick={() => {this.onSetStep('vaxx')}} data-toggle="tooltip" data-placement="top" title="IMMUNIZATION RECORD ">
                        <span className="glyphicon glyphicon-pushpin"></span>
                        <div className="modal-container"></div>
                      </button>
                      <button type="button" className="btn btn-dark" data-toggle="tooltip" data-placement="top" title="VIEW PREVIOUS MARs">
                        <span className="glyphicon glyphicon-warning-sign"></span>
                      </button>
                      <button type="button" className="btn btn-dark" data-toggle="tooltip" data-placement="top" onClick={() => this.onPublishReport()} title="PUBLISH MAR TO PATIENT">
                        <span className="glyphicon glyphicon-export"></span>
                      </button>
                      <button type="button" className="btn btn-dark"  onClick={() => {this.onSetStep('aim')}} data-toggle="tooltip" data-placement="top" title="AIM WIZARD" style={{fontSize: 12, fontWeight: 500, padding: '14px 10px'}}>
                        AIM
                      </button>
                    </div>}
                  </div>
                  {report.mode !== "patient" &&
                    <div className="col-md-6 col-sm-8 col-md-offset-3 col-sm-offset-2 col-xs-12">
                      <button className="btn btn-link btn-block btn-lg text-center" onClick={this.createNewSection}>Add New Section</button>
                    </div>
                  }
                </div>
              }
            </Motion>
            <div className="col-md-2 col-md-offset-1 hidden-xs hidden-sm">
              {report.mode === "patient" &&  <BuilderSidebar sections={report.content} activeSectionIndex={this.state.activeSectionIndex} />}
            </div>
            <div className="visible-xs-block">
              <div className="navbar navbar-default navbar-fixed-bottom" style={{zIndex: 99999, paddingTop: '4px', background: '#18222E'}}>
                <div className="col-xs-6">
                  <div className="dropup">
                    <button className="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown" style={{fontWeight: 300, fontSize: '18px',fontFamily: "'Libre Baskerville', serif"}}>Sections</button>
                    <SectionsMenu sections={report.content} activeSectionIndex={this.state.activeSectionIndex} />
                  </div>
                </div>
                <div className="col-xs-3">
                  {this.state.activeSectionIndex !== 0 &&  <span style={{cursor: 'pointer', textAlign: 'center', margin: 5, display: 'block', color: '#C8C2BB'}} className="fa fa-inverse fa-2x fa-long-arrow-up" onClick={this.onSectionUp}></span>}
                </div>
                <div className="col-xs-3">
                  {this.state.activeSectionIndex !== this.state.report.content.length && <span style={{cursor: 'pointer', textAlign: 'center', margin: 5, display: 'block', color: '#C8C2BB'}} className="fa fa-inverse fa-2x fa-long-arrow-down" onClick={this.onSectionDown}></span>}
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }
    else{
      return null
    }
  }
}

Builder.propTypes = {
  children: PropTypes.object,
  router: PropTypes.object
}

function mapStateToProps(state, ownProps){
  // console.log(state)
  return {
    report: state.report,
    chart: state.chart,
    entries: state.entries,
    interventions: state.interventions
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(builderActions, dispatch),
    chartActions: bindActionCreators(chartActions, dispatch),
    interventionActions: bindActionCreators(interventionActions, dispatch),
    entryActions: bindActionCreators(entryActions, dispatch),
    engineActions: bindActionCreators(engineActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Builder)
