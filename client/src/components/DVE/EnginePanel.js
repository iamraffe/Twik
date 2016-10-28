import React, { PropTypes } from 'react'
import moment from 'moment'
import toastr from 'toastr'

import { DataConverter } from '../../lib/converter'

import Panels from './Panels'

function multiDateParser(date){

  // var dateString = yyyy +'-'+(mm[1]?mm:"0"+mm[0]) +'-' + (dd[1]?dd:"0"+dd[0]);

  if(date.indexOf("th") > -1){
    var parsedDate = d3.time.format("%B %_dth, %Y").parse(date);
    return  parsedDate !== null ? parsedDate : d3.time.format("%B %_dth %Y").parse(date);
  }
  else{
    parsedDate = new Date(Date.parse(date));
  }
  // return new Date(Date.parse(date));
  //
  var yyyy = parsedDate.getFullYear().toString();
  var mm = (parsedDate.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = parsedDate.getDate().toString();
  return moment(yyyy +'-'+(mm[1]?mm:"0"+mm[0]) +'-' + (dd[1]?dd:"0"+dd[0]));
}


class EnginePanel extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      step: props.step,
      chart: props.chart,
      entries: props.entries,
      interventions: props.interventions,
      inputRowLength: props.entries.length === 0 ? 1 : props.entries.length,
      users: props.users,
      randomEntries: []
    }

    this.onUserSelected = props.onUserSelected
    this.onInterventionUpdate = props.onInterventionUpdate
    this.onInterventionCreate = props.onInterventionCreate
    this.onChartCompleted = props.onChartCompleted
    this.onEntryDateChange = props.onEntryDateChange
    this.onEntryValueChange = props.onEntryValueChange
    this.onEntryUpdateAll = props.onEntryUpdateAll
    // this.onCopyPasteData =  props.onCopyPasteData
    this.onSetStep = props.onSetStep
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      step: nextProps.step,
      entries: nextProps.entries,
      chart: nextProps.chart,
      interventions: nextProps.interventions,
      users: nextProps.users,
      inputRowLength: nextProps.entries.length === 0 ? 1 : nextProps.entries.length
    })
  }

  onAddInputRow = (e) => {
    e.preventDefault()
    // const addedToRandom = this.state.randomEntries
    this.setState({
      inputRowLength: this.state.inputRowLength + 1
    })
  }

  onDeleteInputRow = (e) => {
    if(this.state.entries.length > 1 || this.state.chart.entries.length > 1 || this.state.inputRowLength > 1){
      this.setState({
        inputRowLength: this.state.inputRowLength - 1
      })
    }
    else{
      toastr.error("We're going to need at least one data point")
    }
  }

  onCopyPasteData = (e) => {
    const pastedData = JSON.parse(new DataConverter().convert(e.target.value))
    const { symbols, entries } = this.state.chart
    // console.log("PASTED DATA => ", pastedData, pastedData.length)
    this.setState({
      inputRowLength: entries.length + pastedData.length,
      randomEntries:  _.map(pastedData, (entry) => {
                        let formData = {}
                         _.each(symbols, (s, i) => {
                            formData = {date: null, value: null, symbol: null}
                            formData["value"] = parseFloat(entry[`val${(i+1)}`]),
                            formData["symbol"] = s,
                            formData["date"] = multiDateParser(entry.val0)
                          })
                        return formData
                      })
    })
  }

  onStartOver = () => {
    const { entries, chart } = this.state
    // console.log()
    this.setState({
      randomEntries: [],
      inputRowLength: chart.entries.length === 0 ? 1 : chart.entries.length
    })
  }

  onDataSelected = (e) => {
    const { entries, chart } = this.state
    this.props.onDataSelected(e)

    this.setState({
      randomEntries: [],
      inputRowLength: chart.entries.length === 0 ? 1 : chart.entries.length
    })
  }

  onRandomEntryEditedPersist = (index, key, value, name) => {
    console.log(index, key, value, name)
    const { entries, randomEntries, chart } = this.state
    let newEntry = {}
    newEntry[key] = value
    // newEntry["symbol"] = name
    this.setState({
      randomEntries:  [
                        ...randomEntries.slice(0, index),
                        Object.assign({}, randomEntries[index], newEntry),
                        ...randomEntries.slice(index + 1)
                      ]
    })
  }

  onRandomEntryEditedPersistBoth = (index, value, date, symbol) => {
    // console.log(index, key, value, symbols)
    const { entries, randomEntries, chart } = this.state
    let newEntry = {value, date, symbol}
    // newEntry["value"] = value
    // newEntry["date"] =
    // newEntry["symbol"] = symbols
    this.setState({
      randomEntries:  [
                        ...randomEntries.slice(0, index),
                        Object.assign({}, randomEntries[index], newEntry),
                        ...randomEntries.slice(index + 1)
                      ]
    })
  }

  onEntryEditedPersist = (e, inputType, index) => {
    const { entries, randomEntries, chart } = this.state
    if(inputType === "number"){
      const value = parseFloat(e.target.value)
      if(entries[parseInt(index)] && value !== entries[parseInt(index)].value){
        this.onEntryValueChange(value, parseInt(index))
      }
    }
    else{
      const date = moment(e.target.value, "MM/DD/YYYY")
      if(entries[parseInt(index)] && date !== entries[parseInt(index)].date){
        this.onEntryDateChange(date, parseInt(index))
      }
    }
  }

  onEntryEdited = (e) => {
    const { entries, randomEntries, chart } = this.state
    const inputType = e.target.type
    const name = e.target.getAttribute('name').split('--')[1]
    let index = e.target.getAttribute('id')
    let entriesIndex = _.findIndex(entries, (e) => {return e.date && e.date.toString() === index} )
    // console.log(index, name, typeof(name), name === "0")
    // debugger;
    if(chart.type !== "BmiAge"){
      if(entries[parseInt(index)]){
        this.onEntryEditedPersist(e, inputType, index)
      }
      else if(entriesIndex !== -1){
        this.onEntryEditedPersist(e, inputType, entriesIndex)
      }
      else{
        let ind, value
        if(isNaN(parseInt(index))){
          ind = _.findIndex(randomEntries, (e) => {return e.date && e.date.toString() === index} )
          value = inputType === "number" ? parseFloat(e.target.value) : e.target.value
        }
        else{
          ind = randomEntries.length > 0 ? randomEntries.length : index
          value = inputType === "number" ? parseFloat(e.target.value) : moment(e.target.value, "MM/DD/YYYY")
        }
        this.onRandomEntryEditedPersist(ind, inputType === "number" ? "value" : "date", value)
      }
    }
    else{
      // let groupedEntries = _.groupBy(entries, (d, i) => { return d.date })
      // let groupedEntries = _.groupBy(entries, (d, i) => { return d.date })
      let entriesIndex = _.findIndex(entries, (e) => {return e.date && e.date.toString() === index } )
      let groupedStoredEntries = _.groupBy(entries, (d, i) => { return d.date })
      let storedKey = _.findKey(groupedStoredEntries, (o, k) => { return index === k })
      console.log(storedKey, inputType, groupedStoredEntries)
      // debugger;
      if(storedKey){
        if(inputType === "text"){
          let nDate = moment(e.target.value, "MM/DD/YYYY")
          groupedStoredEntries[nDate.toString()] =  _.map(groupedStoredEntries[storedKey], (entry) => {
                                    return {
                                      ...entry,
                                      date: nDate
                                    }
                                  })
          delete groupedStoredEntries[storedKey]
        }
        else{
          let value = parseFloat(e.target.value)
          console.log(name)
          let entIndex = _.findIndex(groupedStoredEntries[storedKey], (e) => {return e.symbol.toLowerCase() === name.toLowerCase()})
          console.log(entIndex)
          groupedStoredEntries[storedKey][entIndex] = _.assign({}, groupedStoredEntries[storedKey][entIndex], {symbol: name.toLowerCase(), value})
          // if(name === "HEIGHT"){
          //   groupedStoredEntries[storedKey][0] = _.assign({}, groupedStoredEntries[storedKey][0], {symbol: name.toLowerCase(), value})
          // }
          // else{
          //   groupedStoredEntries[storedKey][1] =  _.assign({}, groupedStoredEntries[storedKey][1], {symbol: name.toLowerCase(), value})
          // }
        }
        console.log(groupedStoredEntries)
        // debugger;
        this.onEntryUpdateAll(groupedStoredEntries)
      }
      else if(entries[parseInt(index)]){
        console.log(e, inputType, index)
        debugger;
        this.onEntryEditedPersist(e, inputType, index)
      }
      else if(entriesIndex !== -1){
        console.log(e, inputType, entriesIndex)
        debugger;
        this.onEntryEditedPersist(e, inputType, entriesIndex)
      }
      else{
        let groupedEntries = _.groupBy(randomEntries, (d, i) => { return d.date })
        let ind = _.findIndex(randomEntries, (e) => {return e.date && e.date.toString() === index} )
        console.log(groupedEntries, ind, e.target.value, inputType)
        // debugger;
        if(ind === -1 && inputType === "text"){
          this.onRandomEntryEditedPersist((_.keys(groupedEntries).length*2), "date", moment(e.target.value, "MM/DD/YYYY"))
        }
        else if(inputType === "number"){
          let dateKey = _.findKey(groupedEntries, (o, k) => { return index === k })
          let value = parseFloat(e.target.value)
          if(name === "HEIGHT"){
            groupedEntries[dateKey][0] = _.assign({}, groupedEntries[dateKey][0], {symbol: name.toLowerCase(), value, date: index})
            // this.onRandomEntryEditedPersistBoth(randomEntries.length-1, value, index, name)
            // this.onRandomEntryEditedPersist(randomEntries.length, "value", value)
          }
          else{
            groupedEntries[dateKey][1] =  _.assign({}, groupedEntries[dateKey][1], {symbol: name.toLowerCase(), value, date: index})
            // this.onRandomEntryEditedPersistBoth(randomEntries.length, value, index, name)
            // this.onRandomEntryEditedPersist((randomEntries.length+1), "value", value)
          }
          console.log(groupedEntries, _.flatMap(groupedEntries))
          this.setState({
            randomEntries: _.flatMap(groupedEntries)
          })
        }
        // else if(inputType === "number"){
        //   let dateKey = _.findKey(groupedEntries, (o, k) => { return index === k })
        //   let value = parseFloat(e.target.value)
        //   if(name === "HEIGHT"){
        //     groupedEntries[dateKey][0] = _.assign({}, groupedEntries[dateKey][0], {symbol: "HEIGHT", value})
        //     // this.onRandomEntryEditedPersistBoth(ind, value, index, name)
        //     // this.onRandomEntryEditedPersist(randomEntries.length, "value", value)
        //   }
        //   else{
        //     groupedEntries[dateKey][1] =  _.assign({}, groupedEntries[dateKey][1], {symbol: "WEIGHT", value})
        //     // this.onRandomEntryEditedPersistBoth(ind, value, index, name)
        //     // this.onRandomEntryEditedPersist((randomEntries.length+1), "value", value)
        //   }
        // }
        else if(inputType === "text"){
          this.onRandomEntryEditedPersist(ind, "date", moment(e.target.value, "MM/DD/YYYY"))
        }
        console.log(groupedEntries, _.keys(groupedEntries).length)
        // debugger;
        // let ind, value
        // if(isNaN(parseInt(index))){
        //   ind = _.findIndex(randomEntries, (e) => {return e.date && e.date.toString() === index && e.symbol === name} )
        //   value = inputType === "number" ? parseFloat(e.target.value) : e.target.value
        //   // console.log("Ind value", ind, value)
        //   // debugger;
        // }
        // else{
        //   ind = randomEntries.length > 0 ? randomEntries.length : index
        //   value = inputType === "number" ? parseFloat(e.target.value) : moment(e.target.value, "MM/DD/YYYY")
        // }
        // console.log("IND INDEX ", ind, index, name, e.target)
        // // debugger;
        // if(name === "0" || !isNaN(parseInt(name))){
        //   this.onRandomEntryEditedPersist(ind, inputType === "number" ? "value" : "date", value, name)
        // }
        // else{
        //   if(ind === -1){
        //     ind = name === "HEIGHT" ? (randomEntries.length-1) : (randomEntries.length)
        //   }
        //   this.onRandomEntryEditedPersistBoth(ind, parseFloat(value), index, name)
        //   // this.onRandomEntryEditedPersist(ind, "date", index, name)
        // }
        // if(ind === -1 && (randomEntries.length%2) === 1 && randomEntries.length !== 1){
        //   this.onRandomEntryEditedPersist((randomEntries.length+1), "value" , parseFloat(value), name)
        //   this.onRandomEntryEditedPersist((randomEntries.length+1), "date", index, name)
        // }
        // else{
        //   // ind = ind === -1 ?
        //   this.onRandomEntryEditedPersist(ind === -1 ? 0 : ind, inputType === "number" ? "value" : "date", value, name)
        // }
      }
    }
  }

  // onInterventionEdit = (type, index) => {
  //   const { interventions, intervention } = this.state

  //   let toBeEdited = _.filter(interventions, {type: "Medication"})[index]
  //   toBeEdited.start = moment(toBeEdited.start)
  //   toBeEdited.end = moment(toBeEdited.end)
  //   toBeEdited = {
  //     ...toBeEdited,
  //     edit: true,
  //     index: index
  //   }

  //   this.setState({
  //     intervention: Object.assign({}, intervention, toBeEdited)
  //   })
  // }

  // onInterventionDelete = (type, index) => {
  //   const { interventions } = this.state
  //   this.props.chartActions.removeIntervention(index)
  //   this.setState({
  //     interventions: [
  //       ..._.filter(interventions, {type: "Medication"}).slice(0, index),
  //       ..._.filter(interventions, {type: "Medication"}).slice(index+1)
  //     ]
  //   })
  // }

  render(){
    const { step, chart, entries, inputRowLength, interventions, randomEntries, users } = this.state
    const { mode } = this.props

    return (
      <div>
        <Panels
          step={step}
          mode={mode}
          randomEntries={randomEntries}
          inputRowLength={inputRowLength}
          entries={entries}
          chart={chart}
          users={users}
          interventions={interventions}
          onSetStep={this.onSetStep}
          onUserSelected={this.onUserSelected}
          onDataSelected={this.onDataSelected}
          onDeleteInputRow={this.onDeleteInputRow}
          onAddInputRow={this.onAddInputRow}
          onEntryEdited={this.onEntryEdited}
          onInterventionCreate={this.onInterventionCreate}
          onInterventionUpdate={this.onInterventionUpdate}
          onChartCompleted={this.onChartCompleted}
          onCopyPasteData={this.onCopyPasteData}
          onStartOver={this.onStartOver}
        />
      </div>
    )
  }
}

EnginePanel.propTypes = {
  step: PropTypes.string.isRequired,
  chart: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired,
  interventions: PropTypes.array.isRequired
}

export default EnginePanel
