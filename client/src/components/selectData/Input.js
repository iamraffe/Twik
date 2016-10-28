import React, {PropTypes} from 'react'
import lodash from 'lodash'
import DatePicker from 'react-datepicker'
import moment from 'moment'

class Input extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      date: typeof(props.date) === "undefined" ? "" : moment(props.date),
      value: typeof(props.value) === "undefined" ? "" : props.value,
      symbol: props.symbol
    }

    this.onEntryEdited = props.onEntryEdited
    // this.handleChange = this.handleChange.bind(this)
    // this.handleBlur = this.handleBlur.bind(this)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      date: nextProps.date === undefined ? "" : moment(nextProps.date),
      value: nextProps.value === undefined ? "" : nextProps.value
    })
  }

  handleChange = (e) => {
    // debugger;
    let { type } = this.props
    if(type === "date"){
      this.setState({
        date: e
      })
    }
    else{
      this.onEntryEdited(e)
      this.setState({
        value: e.target.value
      })
    }
  }

  handleBlur = (e) => {
    this.onEntryEdited(e)
  }

  render(){
    let { date, symbol, value } = this.state
    let { type, index, chart } = this.props
    // console.log("fakin index", index)
    if(type === "date"){
      // console.log(this.state, date, typeof(date), type, typeof(date) === "string")
      return(
        <DatePicker
          id={index.toString()}
          className="session--input"
          isClearable={true}
          name={`date--${index}`}
          placeholderText="Click to set date"
          showYearDropdown
          dateFormatCalendar="MMMM"
          selected={typeof(date) === "string" || date === null ? null : moment(moment(date))}
          maxDate={moment()}
          onChange={(e) => {this.handleChange(e)}}
          onBlur={(e) => {this.handleBlur(e)}}
        />
      )
    }
    else{
      // console.log(value, typeof(value), symbol)
      // placeholder={typeof(value) !== "number" ? chart.symbols[0] : value}
      return(
        <input
          id={index.toString()}
          name={`entry--${symbol}--${index}`}
          className="session--input"
          type="number"
          step="0.01"
          min="0"
          value={isNaN(value) ? '' : value}
          placeholder={typeof(value) !== "number" ? _.startCase(symbol).toUpperCase() : value}
          onChange={(e) => {this.handleChange(e)}} />
      )
    }

  }
}

export default Input
