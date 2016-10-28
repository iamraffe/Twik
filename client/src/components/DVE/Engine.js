import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Autosuggest from 'react-autosuggest'
import getFormData from 'get-form-data'
import _ from 'lodash'
import moment from 'moment'

import API from '../../api/api'
import { months } from '../charts/common/utils'

import * as builderActions from '../../actions/builderActions'
import * as chartActions from '../../actions/chartActions'
import * as interventionActions from '../../actions/interventionActions'
import * as entryActions from '../../actions/entryActions'
import * as engineActions from '../../actions/engineActions'
import * as userActions from '../../actions/userActions'

import Chart from '../charts/Chart'
import InterventionForm from '../selectCustomizations/InterventionForm'
import InterventionList from '../common/InterventionList'
import EnginePanel from './EnginePanel'
import EngineControls from './EngineControls'

function getParameterByName(name) {
  var res = new RegExp(
      // Parameter names always start after a ? or &.
      '[\?&]' +

      // Make sure any [ or ] are escaped in the name.
      name.replace(/\[/g, '\\\[').replace(/\]/g, '\\\]') +

      // Either match a =... or match an empty value.
      // Values can be terminated by an & a # or the end of the string ($).
      '(?:=([^&#]*))?(?:[&#]|$)'
  ).exec(window.location.search);

  return res ?
    (res[1] ? // res[1] will be undefined for a parameter without value.
      decodeURIComponent(res[1].replace(/\+/g, ' ')) : ''
    ) : null;
}

class Engine extends React.Component{
  constructor(props, context){
    super(props, context)

    // console.log(props)
    this.state = {
      chart: props.chart,
      step: 'users',
      users: props.users,
      entries: props.entries,
      interventions: props.interventions
    }
  }

  componentDidMount(){
    this.loadInfo()
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      interventions: nextProps.chart.interventions,
      entries: nextProps.chart.entries,
      chart: Object.assign({}, this.state.chart, nextProps.chart),
      users: nextProps.users
    })
    if(nextProps.chart.completed){
      const { chart } = this.state
      window.location.href = `/users/${chart.user.id}/charts/${nextProps.chart.id}`
    }
  }

  loadInfo = () => {
    const chartType = getParameterByName('chartType')
    const user = {
      id: getParameterByName('id'),
      ext: getParameterByName('ext'),
      first_name: getParameterByName('first_name'),
      last_name: getParameterByName('last_name'),
      date_of_birth: getParameterByName('date_of_birth'),
      gender: getParameterByName('gender'),
    }
    const { mode, type } = this.props

    this.props.chartActions.selectTypeAndSymbols(chartType)
    this.props.engineActions.selectEngineMode(mode)


    if(user.id !== null){
      this.props.entryActions.loadEntries(user.id, chartType)
      this.props.interventionActions.loadInterventions(user.id)
      this.props.chartActions.selectUser(user)
      this.onSetStep('data')
    }
    else{
      this.props.userActions.loadUsers()
    }
    // window.history.replaceState({}, document.title, location.protocol + "//" + location.host + location.pathname)
  }

  onUserSelected = (user) => {
    this.props.interventionActions.loadInterventions(user.id)
    this.props.entryActions.loadEntries(user.id, this.state.chart.type)
    this.props.chartActions.selectUser(user)
    this.onSetStep('data')
  }

  onSetStep = (step) => {
    this.setState({
      step
    })
  }

  onEntryDateChange = (newDate, index) => {
    this.props.chartActions.editEntryDateData(newDate, index)
    this.setState({
      entries: _.sortBy([
                          ...this.state.entries.slice(0, index),
                          Object.assign({}, this.state.entries[index], {date: newDate}),
                          ...this.state.entries.slice(index + 1)
                        ], function(entry) {return entry.date})
    })
  }

  onEntryValueChange = (newValue, index) => {
    this.props.chartActions.editEntryValueData(newValue, index)
    this.setState({
      entries: _.sortBy([
                          ...this.state.entries.slice(0, index),
                          Object.assign({}, this.state.entries[index], {value: newValue}),
                          ...this.state.entries.slice(index + 1)
                        ], function(entry) {return entry.date})
    })
  }

  onEntryUpdateAll = (groupedEntries) => {
    // console.log(_.flatMap(groupedEntries))
    _.each(_.flatMap(groupedEntries), (entry, index) => {
      this.props.chartActions.editEntryDateData(entry.date, index)
      this.props.chartActions.editEntryValueData(entry.value, index)
    })
    // debugger;
  }

  getCleanEntryData = (form) => {
    const { symbols } = this.state.chart
    let data = getFormData(form)
    // console.log("DATA => ", data)
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
    const formData = this.getCleanEntryData(document.getElementById('data-grid'))
    this.props.chartActions.selectData(formData)

    this.setState({
      step: 'interventions'
    })
  }

  onInterventionCreate = (formData) => {
    this.props.chartActions.selectIntervention(formData)
    const clickedButton = document.activeElement.getAttribute('name')
    this.setState({
      step: clickedButton ===  'continue' ? 'interventions' : 'confirmation',
    })
  }

  onInterventionUpdate = (formData) => {
    this.props.chartActions.updateIntervention(formData)
  }

  onChartCompleted = () => {
    const { chart } = this.state
    this.props.chartActions.confirmChart(chart)
  }

  render(){
    const { chart, step, entries, interventions, users } = this.state
    const { mode, type } = this.props
    // console.log(chart)
    // debugger;
    if(chart.type !== ""){
      return(
        <section className="row chart-multi-step">
          <div className="col-xs-12">
            <header className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <h1>{`${type.capitalize()} ${_.startCase(chart.type)} graph`}</h1>
              </div>
            </header>
            <div className="row">
              <div className="engine-panel-wrapper col-sm-3">
                <EnginePanel
                  mode={mode}
                  step={step}
                  chart={chart}
                  entries={entries}
                  users={users}
                  interventions={interventions}
                  onSetStep={this.onSetStep}
                  onUserSelected={this.onUserSelected}
                  onDataSelected={this.onDataSelected}
                  onInterventionCreate={this.onInterventionCreate}
                  onInterventionUpdate={this.onInterventionUpdate}
                  onChartCompleted={this.onChartCompleted}
                  onEntryDateChange={this.onEntryDateChange}
                  onEntryValueChange={this.onEntryValueChange}
                  onEntryUpdateAll={this.onEntryUpdateAll}
                />
              </div>
              <section className="chart-wrapper col-sm-6">
                <Chart
                  chartType={chart.type}
                  entries={chart.entries}
                  interventions={chart.interventions}
                  user={chart.user}
                />
                <EngineControls step={step} />
              </section>
            </div>
          </div>
        </section>
      )
    }
    else{
      return null
    }
  }
}

// Engine.propTypes = {
//   entries: PropTypes.array.isRequired,
//   chart: PropTypes.object.isRequired,
//   interventions: PropTypes.array.isRequired,
//   mode: PropTypes.string.isRequired
// }

function mapStateToProps(state, ownProps){
  return {
    chart: state.chart,
    entries: state.entries,
    interventions: state.interventions,
    users: state.users
  }
}


function mapDispatchToProps(dispatch){
  return {
    chartActions: bindActionCreators(chartActions, dispatch),
    interventionActions: bindActionCreators(interventionActions, dispatch),
    entryActions: bindActionCreators(entryActions, dispatch),
    engineActions: bindActionCreators(engineActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Engine)
