import React, {PropTypes} from 'react'
import DatePicker from 'react-datepicker'

class InterventionForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      title: props.title,
      description: props.description
    }
  }

  componentWillReceiveProps(nextProps){
    if((this.props.index != nextProps.index) ){
      this.setState({
        title: nextProps.title,
        description: nextProps.description
      })
    }
  }

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  onTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  render(){
    const {id, edit, chartType, index, type, onSubmit, startDate, endDate, handleStartDateChange, handleEndDateChange, active, currentDate, onCurrentDate, onCheckBoxCheck} = this.props
    const {title, description} = this.state

    return(
      <div>
        <form onSubmit={(e) => onSubmit(e, edit)} id="intervention-create" className="visible-intervention-form">
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="index" value={index} />
          <input type="hidden" name="id" defaultValue={id} />
          <input type="hidden" name="chart_type" defaultValue={chartType}/>
          <div className="row">
            <div className="form-group">
              <div className="col-xs-5">
                <label htmlFor="title" className="pull-right">Medication</label>
              </div>
              <div className="col-xs-7">
                <input type="text" className="form-control" name="title" value={title ? title : ""} onChange={this.onTitleChange} placeholder={title ? title : "(ie: Crestor, Simcor...)"} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <div className="col-xs-5">
              <label htmlFor="description" className="pull-right">Dose</label>
              </div>
              <div className="col-xs-7">
                <input type="text" className="form-control" name="description" value={description ? description : ""} onChange={this.onDescriptionChange} placeholder={description ? description : "(ie: 40mg, 20mg...)"} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <div className="col-xs-5">
              <label htmlFor="start" className="pull-right">Start date</label>
              </div>
              <div className="col-xs-7">
                <DatePicker
                  className="form-control"
                  isClearable={true}
                  name="start"
                  startDate={startDate}
                  endDate={endDate}
                  showYearDropdown
                  dateFormatCalendar="MMMM"
                  selected={startDate}
                  onChange={handleStartDateChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <div className="col-xs-5">
                <label htmlFor="end" className="pull-right">End date</label>
              </div>
              <div className="col-xs-7">
                <DatePicker
                  className="form-control"
                  isClearable={true}
                  name="end"
                  startDate={startDate}
                  endDate={endDate}
                  showYearDropdown
                  dateFormatCalendar="MMMM"
                  selected={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-7 col-xs-offset-5">
              <div className="checkbox">
                <label><input type="checkbox" value={currentDate} onChange={onCurrentDate} />Current Date</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-7 col-xs-offset-5">
              <div className="checkbox">
                <label><input type="checkbox" value={active} name="active" onChange={onCheckBoxCheck} />Active</label>
              </div>
            </div>
          </div>
          <div className="row">
            <button type="submit" name="continue" className="btn btn-light btn-slim btn-block">Add Another Intervention</button>
          </div>
          <div className="row">
            <button type="submit" className="submit-and-exit btn btn-light btn-slim btn-block" name="exit" value="true">Save &amp; Exit</button>
          </div>
        </form>
      </div>
    )
  }
}

InterventionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  currentDate: PropTypes.bool.isRequired,
  onCurrentDate: PropTypes.func.isRequired,
  onCheckBoxCheck: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string.isRequired
}

export default InterventionForm
