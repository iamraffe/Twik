import React, {PropTypes} from 'react'
import * as chartActions from '../../actions/chartActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toastr from 'toastr'
import LineChart from '../charts/lineChart/LineChart'
import StackedBarChart from '../charts/barChart/StackedBarChart'
import { presets } from 'react-motion'
import moment from 'moment'
import getFormData from 'get-form-data'
import _ from 'lodash'
import {Motion, spring} from 'react-motion'
import InterventionForm from './InterventionForm'
import InterventionList from '../common/InterventionList'

class SelectCustomizations extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      user: props.chart.user,
      entries: props.entries,
      chart: props.chart,
      isOpened: false,
      currentDate: false,
      interventions: props.interventions,
      intervention: {
        id: null,
        start: moment(),
        end: moment().add(1, 'days'),
        title: null,
        description: null,
        active: false,
        index: 1,
        edit: false
      }
    }
  }

  toggleInterventionWidget = () => {
    let { isOpened } = this.state
    this.setState({
      isOpened: !isOpened
    })
  }

  canSubmit = (data) => {
    let canSubmit = true
    _.forEach(data, (input) => {
      if(input === ""){
        canSubmit = false
      }
    })
    return canSubmit
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      interventions: nextProps.interventions
    })
  }

  interventionCreate = (e) => {
    e.preventDefault()
    const clickedButton = document.activeElement.getAttribute('name')

    const form = document.getElementById('intervention-create')
    const formData = getFormData(form)
    if(this.canSubmit(formData)){
      this.props.actions.selectIntervention(formData)
      form.reset()
      this.setState({
        isOpened: clickedButton === "continue" ? true : false,
        intervention: {
          id: null,
          title: null,
          description: null,
          active: false,
          index: this.state.intervention.index+1,
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

  handleStartDateChange = (event) => {
    this.setState({
      intervention: {
        ...this.state.intervention,
        start: event
      }
    })
  }

  handleEndDateChange = (event) => {
    console.log(event)
    this.setState({
      intervention: {
        ...this.state.intervention,
        end: event
      }
    })
  }

  onCheckBoxCheck = (e) => {
    this.setState({
      intervention: {
        ...this.state.intervention,
        active: !this.state.intervention.active
      }
    })
  }

  onCurrentDate = (e) => {
    this.setState({
      currentDate: !this.state.currentDate,
      intervention: {
        ...this.state.intervention,
        end: this.state.currentDate ? this.state.intervention.end : moment()
      }
    })
  }

  customizationComplete = (e) => {
    e.preventDefault()
    let submitLocation = {pathname: `/charts/engine/chart-confirmation`}
    this.context.router.push(submitLocation)
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

  interventionUpdate = (e) => {
    e.preventDefault()
    const clickedButton = document.activeElement.getAttribute('name')
    const form = document.getElementById('intervention-create')
    const formData = getFormData(form)

    if(this.canSubmit(formData)){
      this.props.actions.updateIntervention(formData)
      console.log(formData)
      form.reset()
      this.setState({
        isOpened: clickedButton === "continue" ? true : false,
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
    console.log(type, index)
    this.props.actions.removeIntervention(index)
    this.setState({
      interventions: [
        ..._.filter(interventions, {type: "Medication"}).slice(0, index),
        ..._.filter(interventions, {type: "Medication"}).slice(index+1)
      ]
    })
  }

  filterInterventions = (interventions, chart) => {
    return _.filter(interventions, intervention => {
              return intervention.chart_type === undefined || (intervention.chart_type.replace(/\s+/g, '').toLowerCase() ===  chart.type.toLowerCase())
            })
  }

  render(){
    const { entries, user, chart, isOpened, currentDate, interventions } = this.state
    const { start, end, active, title, description, edit, index, id } = this.state.intervention

    return(
      <div>
        <div className="col-xs-3">
          <button name="back_button" type="submit" className="btn-back btn btn-link"><span className="fa fa-arrow-left"></span> <span className="text">Back</span></button>
          <section className="row intervention-form">
            <div>
              <Motion style={{x: spring(isOpened ? 0 : 110), opacity: spring(isOpened ? 1 : 0)}}>
                {({x, opacity}) =>
                  <div className="row" style={{
                    marginTop: "65px",
                    backgroundColor: "#F0ECEB",
                    padding: 10,
                    WebkitTransform: `translateX(${x}%)`,
                    transform: `translateX(${x}%)`,
                    opacity: opacity
                  }}>
                    <ul className="nav intervention-nav-tabs nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#add-medication" aria-controls="add-medication" role="tab" data-toggle="tab">Medication</a></li>
                      <li role="presentation"><a href="#add-event" aria-controls="add-event" role="tab" data-toggle="tab">Event</a></li>
                      <li role="presentation"><a href="#add-lifestyle" aria-controls="add-lifestyle" role="tab" data-toggle="tab">Lifestyle</a></li>
                    </ul>
                    <div className="tab-content">
                      <div role="tabpanel" className="tab-pane active" id="add-medication">
                        <InterventionForm
                          onSubmit={edit ? this.interventionUpdate : this.interventionCreate}
                          type={"Medication"}
                          index={index}
                          title={title}
                          chartType={chart.type.capitalize()}
                          description={description}
                          startDate={start}
                          endDate={end}
                          id={id ? id : "undefined"}
                          handleStartDateChange={this.handleStartDateChange}
                          handleEndDateChange={this.handleEndDateChange}
                          active={active}
                          currentDate={currentDate}
                          onCurrentDate={this.onCurrentDate}
                          onCheckBoxCheck={this.onCheckBoxCheck}
                        />
                      </div>
                      <div role="tabpanel" className="tab-pane" id="add-event">
                        Event Tab!
                      </div>
                      <div role="tabpanel" className="tab-pane" id="add-lifestyle">
                        Lifestyle Tab!
                      </div>
                    </div>
                  </div>
                }
              </Motion>
            </div>
          </section>
        </div>
        <section className="row chart-current-step">
          <div className="customizing-step">
            <div className="col-sm-9">
              <section className="row">
                <div className="col-sm-8">
                  <div className="row">
                    <header className="col-sm-6">
                      <h1>Great! Do you have any interventions to add?</h1>
                      <h2>Otherwise continue to save the graph.</h2>
                    </header>
                    <aside className="col-sm-6">
                      <button type="button" className="btn btn-slim btn-light btn-block"  onClick={this.toggleInterventionWidget}>
                        {isOpened ? "Close intervention form" : "Add intervention"}
                      </button>
                    </aside>
                  </div>
                </div>
              </section>
              <section className="row">
                <div className="col-sm-8">
                  <header className="row">
                    <div className="col-xs-12">
                      <h1>Patient name:  <span className="patient-name">{`${user.first_name} ${user.last_name}`}</span></h1>
                    </div>
                  </header>
                  <div className="row" id="session-graph-container" className="graph--wrapper" data-type="<%= @chart.type.underscore %>" data-url="chart-session">
                    {chart.entries.length === 1 ?
                      <StackedBarChart
                        chartType={chart.type}
                        data={chart.entries}
                        interventions={this.filterInterventions(interventions, chart)}
                      /> :
                      <LineChart
                        url={'customization'}
                        chartType={chart.type}
                        data={chart.entries}
                        interventions={this.filterInterventions(interventions, chart)}
                      />
                    }
                  </div>
                </div>
                <div className="col-sm-4 svg-controls">
                  === CONTROLS ===

                  <InterventionList
                    editable={true}
                    interventions={this.filterInterventions(interventions, chart)}
                    onEditIntervention={this.onEditIntervention}
                    onDeleteIntervention={this.onDeleteIntervention}
                  />
                </div>
              </section>
              <div className="row">
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-6 col-sm-offset-6">
                      <button type="submit" className="btn-continue btn btn-slim btn-light btn-block" onClick={this.customizationComplete}>Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

  //Pull in the React Router context so router is available on this.context.router.
SelectCustomizations.contextTypes = {
  router: PropTypes.object
}

SelectCustomizations.propTypes = {
  entries: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired,
  interventions: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps){
  // console.log("STATE ON CUSTOMIZATIONS => ", state)
  return {
    entries: state.entries,
    chart: state.chart,
    interventions: state.interventions
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(chartActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCustomizations)
