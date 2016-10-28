import React, {PropTypes} from 'react'
import * as chartActions from '../../actions/chartActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toastr from 'toastr'
import DataGrid from './DataGrid'
import getFormData from 'get-form-data'
import d3 from 'd3'
import moment from 'moment'
import _ from 'lodash'

class SelectData extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      user: props.chart.user,
      entries: props.entries,
      chart: props.chart,
      inputRowLength: 5,
      randomEntries: []
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps, this.props, this.state)
    // debugger;
    if(this.props.entries.length === 0 && nextProps.entries !== 0) {
      this.setState({
        entries: nextProps.entries,
        inputRowLength: nextProps.entries.length+1
      })
    }
  }

  onEntryDateChange = (newDate, index) => {
    this.props.actions.editEntryDateData(newDate, index)
    this.setState({
      entries: _.sortBy([
                          ...this.state.entries.slice(0, index),
                          ...this.state.entries.slice(index + 1),
                          Object.assign({}, this.state.entries[index], {date: newDate})
                        ], function(entry) {return entry.date})
    })
  }

  onEntryValueChange = (newValue, index) => {
    this.props.actions.editEntryValueData(newValue, index)
    this.setState({
      entries: _.sortBy([
                          ...this.state.entries.slice(0, index),
                          ...this.state.entries.slice(index + 1),
                          Object.assign({}, this.state.entries[index], {value: newValue})
                        ], function(entry) {return entry.date})
    })
  }

  onEntryEdited = (e) => {
    const inputType = e.target.type
    const index = parseInt(e.target.getAttribute('id'))

    if(inputType === "number"){
      const value = parseFloat(e.target.value)

      // console.log(value, this.state.entries[index])

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
  }

  getCleanFormData(form){
    let data = getFormData(form)
    // console.log(data)
    let formData = []
    let index = 0
    _.forEach(data, (input, key)=> {
      if(input === "" || input === "undefined"){
        delete data[key]
      }
      else{
        if(typeof(formData[index]) === "undefined"){
          formData[index] = {date: null, value: null, id: null}
        }
        if(key.indexOf('entry') == 0){
          formData[index]["value"] = parseFloat(input)
        }
        else if(key.indexOf('date') == 0){
          formData[index]["date"] = d3.time.format("%x").parse(input)
        }
        else if(key.indexOf('id') == 0){
          formData[index]["id"] = input
        }
        if(formData[index]["value"] !== null &&
            formData[index]["date"] !== null){
          index++
        }
      }
    })
    return _.sortBy(formData, function(entry) {return entry.date})
  }

  canSubmit(data){
    return data.length > 0
  }

  onDataSelected = (e) => {
    e.preventDefault()
    const formData = this.getCleanFormData(document.getElementById('data-grid'))
    // console.log(formData)
    if(this.canSubmit(formData)){
      let submitLocation = {pathname: `/charts/engine/chart-interventions`}
      this.props.actions.selectData(formData)
      this.context.router.push(submitLocation)
    }
    else{
      toastr.error("Need more data!")
    }
  }

  deleteInputRow = (e) => {
    if(this.state.inputRowLength > 1){
      this.setState({
        inputRowLength: this.state.inputRowLength - 1
      })
    }
    else{
      toastr.error("We're going to need at least one data point")
    }
  }

  addInputRow = (e) => {
    e.preventDefault()
    const addedToRandom = this.state.randomEntries
    this.setState({
      inputRowLength: this.state.inputRowLength + 1,
      // randomEntries: this.state.randomEntries.length > 0 ? _.concat(this.state.randomEntries, {date: moment(), value: _.random(3, 155)}) : []
    })
  }

  generateRandom = (e) => {
    e.preventDefault()
    const { entries, user, chart, inputRowLength, randomEntries } = this.state
    // console.log(e, e.target, document.getElementById('data-grid'), document.getElementById('data-grid').length)
    this.setState({
      randomEntries: _.map(Array(inputRowLength-entries.length), (row, key) => {
                        return {
                          date: moment().subtract(inputRowLength-entries.length-key, 'years').subtract(1, "week"),
                          value: _.random(3, 155)
                        }
                      })
    })
  }

  render(){
    const { entries, user, chart, inputRowLength, randomEntries } = this.state

    return(
      <div>
        <div className="col-xs-3">
          <button name="back_button" type="submit" className="btn-back btn btn-link"><span className="fa fa-arrow-left"></span> <span className="text">Back</span></button>
        </div>
        <section className="row chart-current-step">
          <div className="adding-step">
            <div className="col-sm-6">
              <header className="row">
                <h1>Please add the {chart.type} data for: <span className="patient-name"> {`${user.first_name} ${user.last_name}`}</span></h1>
                <h2>Make sure to include the date for each test.</h2>
              </header>
              <form id="data-grid" onSubmit={this.onDataSelected}>
                <DataGrid
                  chart={chart}
                  entries={chart.entries.length > 0 ? chart.entries : entries}
                  deleteInputRow={this.deleteInputRow}
                  addRow={this.addInputRow}
                  generateRandom={this.generateRandom}
                  inputRowLength={inputRowLength}
                  randomEntries={randomEntries}
                  onEntryEdited={this.onEntryEdited}
                />
              </form>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

  //Pull in the React Router context so router is available on this.context.router.
SelectData.contextTypes = {
  router: PropTypes.object
}

SelectData.propTypes = {
  entries: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps){
  return {
    entries: state.entries,
    chart: state.chart
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(chartActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectData)
