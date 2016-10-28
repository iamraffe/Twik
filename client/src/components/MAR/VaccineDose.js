import React, { PropTypes } from 'react'
import getFormData from 'get-form-data'
import moment from 'moment'

class VaccineDose extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      edit: false,
      dose: props.dose,
      vaxx: props.vaxx,
      addable: props.doses.length === props.index && props.vaxx.completed === false,
      lastDose: props.doses.length === (1+props.index) || props.doses.length === 0 && props.index === 0,
      doseType: 'Due',
      completed: props.doses.length === props.index && props.vaxx.completed
    }

    // props.onAddDose
    // props.onUpdateDose
    // props.onUpdateVaxx
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps, this.state)
    // debugger;
    this.setState({
      dose: nextProps.dose,
      vaxx: nextProps.vaxx,
      addable: nextProps.doses.length === nextProps.index && nextProps.vaxx.completed === false,
      lastDose: nextProps.doses.length === (1+nextProps.index) || nextProps.doses.length === 0 && nextProps.index === 0,
      completed: nextProps.doses.length === nextProps.index && nextProps.vaxx.completed
    })
  }

  onEditDose = (e) => {
    const { addable, dose, vaxx } = this.state
    if(dose && !vaxx.completed){
      this.setState({
        edit: !this.state.edit
      })
    }
  }

  onAddDose = (e) => {
    const { addable, vaxx } = this.state
    const { mode } = this.props
    const dose = {
      text: "Due by...",
      vaccination_id: vaxx.id
    }
    if(mode==="full"){
      e.target.parentElement.className += " active"
      this.setState({
        addable: false,
        lastDose: true,
        dose
      })      
    }
    else{
      this.setState({
        addable: false,
        lastDose: false
      }) 
    }

    this.props.onAddDose(dose)
  }

  onDoseTypeChange = (e) => {
    this.setState({
      doseType: e.target.value
    })
  }

  prepareFormData = (formData) => {
    const { dose, vaxx } = this.state
    const { type, due_date, due_text, administered_date, series_complete } = formData
    if(type === "Due"){
      return {
        text: `Due ${due_text === "" ? 'by '+moment(due_date).format('DD/MM/YYYY') : due_text}`,
        id: dose.id
      }
    }
    else{
      if(series_complete === 'on'){
        this.props.onUpdateVaxx({completed: true, id: vaxx.id})
      }
      return {
        text: `${moment(administered_date).format('DD/MM/YYYY')}`,
        id: dose.id
      }
    }
  }

  onUpdateDose = (e) => {
    e.preventDefault()
    const form = document.getElementById('vaxx-update-form')
    const formData = getFormData(form)
    form.reset()
    this.props.onUpdateDose(this.prepareFormData(formData))
    this.onEditDose()
  }

  render(){
    const { edit, vaxx, lastDose, addable, dose, doseType, completed } = this.state
    const { index, mode } = this.props
    if(mode === "full"){
      return(
        <td className={dose ? 'active' : ''} onDoubleClick={this.onEditDose} style={{cursor: (dose ? 'pointer': 'default')}}>
          {dose && <span className="vaxx-dose-text">{dose.text}</span>}
          {lastDose && <span className={`fa ${vaxx.visible ? 'fa-eye-slash' : 'fa-eye'}`} onClick={(e) => {this.props.onUpdateVaxx({visible: !vaxx.visible, id: vaxx.id})}}></span>}
          {addable && <span className="fa fa-plus" onClick={this.onAddDose}></span>}
          {completed && <span className="fa fa-check"></span>}
          {edit && 
            <div id={`vaxx-popover-${index}`} className="vaxx-popover">
              <span className="fa-stack vaxx-close-popover fa-lg" onClick={this.onEditDose}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-times fa-stack-1x fa-inverse"></i>
              </span>
              <form id="vaxx-update-form" onSubmit={this.onUpdateDose}>
                <div className="row">
                  <div className="col-sm-4 left-side">
                    <input type="radio" name="type" value="Due" onChange={this.onDoseTypeChange} checked={doseType === 'Due'} />
                    <label>Due</label>
                  </div>
                  <div className="col-sm-4 right-side">
                    <input className="form-control" name="due_text" type="text" placeholder="text"/>
                  </div>
                  <div className="col-sm-4 right-side">
                    <input className="form-control" name="due_date" type="date"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 left-side">
                    <input type="radio" name="type" value="Administered" onChange={this.onDoseTypeChange} checked={doseType === 'Administered'} />
                    <label>Administered</label>
                  </div>
                  <div className="col-sm-4 right-side">
                    <input className="form-control" name="administered_date" type="date"/>
                  </div>
                </div>
                {doseType === "Administered" && 
                  <div className="row">
                    <div className="col-sm-4 left-side">
                      <label>Series Complete</label>
                    </div>
                    <div className="col-sm-4 right-side">
                      <input name="series_complete" type="checkbox"/>
                    </div>
                  </div>}
                <div className="row">
                  <div className="col-xs-12">
                    <button type="submit" className="btn btn-dark btn-slim btn-block">Save & Exit</button>
                  </div>
                </div>
              </form>
            </div>}
        </td>
      )      
    }
    else{
      return (
        <section className="row" onDoubleClick={this.onEditDose}>
          {dose && <span className="vaxx-dose-text">{dose.text}</span>}
          {lastDose && vaxx.completed === false &&
            <span className={edit ? 'hide' : 'fa-stack vaxx-expand fa-lg pull-right'} onClick={this.onAddDose}>
              <i className="fa fa-circle fa-stack-2x"></i>
              <i className='fa fa-plus fa-stack-1x fa-inverse'></i>
            </span>
          }
          {edit && 
            <div className="shrunk-dose-editor">
              <span className="fa-stack close-shrunk-editor fa-lg" onClick={this.onEditDose}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-times fa-stack-1x fa-inverse"></i>
              </span>
              <form id="vaxx-update-form" onSubmit={this.onUpdateDose}>
                <div className="row">
                  <div className="col-sm-4 left-side">
                    <input type="radio" name="type" value="Due" onChange={this.onDoseTypeChange} checked={doseType === 'Due'} />
                    <label>Due</label>
                  </div>
                  <div className="col-sm-4 right-side">
                    <input className="form-control" name="due_text" type="text" placeholder="text"/>
                  </div>
                  <div className="col-sm-4 right-side">
                    <input className="form-control" name="due_date" type="date"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 left-side">
                    <input type="radio" name="type" value="Administered" onChange={this.onDoseTypeChange} checked={doseType === 'Administered'} />
                    <label>Administered</label>
                  </div>
                  <div className="col-sm-4 right-side">
                    <input className="form-control" name="administered_date" type="date"/>
                  </div>
                </div>
                {doseType === "Administered" && 
                  <div className="row">
                    <div className="col-sm-4 left-side">
                      <label>Series Complete</label>
                    </div>
                    <div className="col-sm-4 right-side">
                      <input name="series_complete" type="checkbox"/>
                    </div>
                  </div>}
                <div className="row">
                  <div className="col-xs-12">
                    <button type="submit" className="btn btn-light btn-slim btn-block">Save & Exit</button>
                  </div>
                </div>
              </form>
            </div>
          }
        </section>
      )
    }
  }
}

export default VaccineDose