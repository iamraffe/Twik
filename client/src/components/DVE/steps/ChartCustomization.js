import React, { PropTypes } from 'react'
import moment from 'moment'
import getFormData from 'get-form-data'
import toastr from 'toastr'
import InterventionForm from '../../selectCustomizations/InterventionForm'

class ChartCustomization extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      user: props.chart.user,
      entries: props.entries,
      chart: props.chart,
      edit: false,
      currentDate: false,
      intervention: {
        id: null,
        start: moment(),
        end: moment().add(1, 'days'),
        title: null,
        description: null,
        active: false,
        index: props.index,
        edit: false
      }      
    }

    this.onInterventionUpdate = props.onInterventionUpdate
    this.onInterventionCreate = props.onInterventionCreate
    this.onSetStep = props.onSetStep
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

  canSubmitInterventionForm = (data) => {
    let canSubmit = true
    _.forEach(data, (input) => {
      if(input === ""){
        canSubmit = false
      }
    })
    return canSubmit
  }

  onInterventionFormSubmit = (e, edit) => {
    e.preventDefault()
    const clickedButton = document.activeElement.getAttribute('name')
    const form = document.getElementById('intervention-create')
    const formData = getFormData(form)

    if(this.canSubmitInterventionForm(formData)){
      if(edit){
        this.onInterventionUpdate(formData)
      }
      else{
        // let formData = {
        //   ...getFormData(form),
        //   start: new Date(getFormData(form).start).toISOString(),
        //   end: new Date(getFormData(form).end).toISOString()
        // }
        this.onInterventionCreate({
          ...formData,
          start: new Date(formData.start).toISOString(),
          end: new Date(formData.end).toISOString()        })
      }
      form.reset()
      this.setState({
        intervention: {
          id: null,
          title: null,
          description: null,
          active: false,
          edit: false,
          index: this.state.intervention.index+(edit ? 0 : 1),
          start: moment(),
          end: moment().add(1, 'days'),
        }
      })
    }   
    else{
      toastr.error("Need more intervention data")
    }
  }

  render(){
    const { chart, currentDate } = this.state
    const { start, end, active, title, description, edit, index, id } = this.state.intervention
    const { mode } = this.props

    return(
      <section className="chart-current-step">
        <button
          type="button"
          className="previous-step-toolbox close"
          onClick={() => this.onSetStep('data')}
          >
          <span className="fa fa-long-arrow-left"></span>
        </button>
        <div className="">
          <section className="row intervention-form">
            <div className="row" style={{
              marginTop: "0",
              // backgroundColor: "#F0ECEB",
              // padding: 10
            }}>
              <ul className="nav intervention-nav-tabs nav-tabs" role="tablist">
                <li role="presentation" className="active"><a href="#add-medication" aria-controls="add-medication" role="tab" data-toggle="tab">Medication</a></li>
                <li role="presentation"><a href="#add-event" aria-controls="add-event" role="tab" data-toggle="tab">Event</a></li>
                <li role="presentation"><a href="#add-lifestyle" aria-controls="add-lifestyle" role="tab" data-toggle="tab">Lifestyle</a></li>
              </ul>
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="add-medication">
                  <InterventionForm
                    type={"Medication"}
                    edit={edit}
                    chartType={chart.type}
                    index={index}
                    title={title}
                    description={description}
                    startDate={start}
                    endDate={end}
                    id={id ? id : "undefined"}
                    active={active}
                    currentDate={currentDate}
                    onSubmit={this.onInterventionFormSubmit}
                    handleStartDateChange={this.handleStartDateChange}
                    handleEndDateChange={this.handleEndDateChange}
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
              <button
                className="btn btn-block btn-light btn-slim"
                onClick={() => this.onSetStep('confirmation')}
              >
                I don't want to
              </button>
            </div>
          </section>
        </div>
      </section>
    )
  }
}

export default ChartCustomization