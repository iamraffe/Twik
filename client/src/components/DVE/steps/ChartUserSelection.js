import React, { PropTypes } from 'react'
import toastr from 'toastr'
import moment from 'moment'

import SelectUserForm from '../../selectUser/SelectUserForm'

class ChartUserSelection extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      value: props.chart.user !== null ? `${props.chart.user.first_name} ${props.chart.user.last_name}` : '',
      suggestions: [],
      users: props.users,
      user: props.chart.user !== null ? props.chart.user : null
    }

    this.onUserSelected = props.onUserSelected
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      users: nextProps.users
    })
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    const { users } = this.state
    const { chart } = this.props

    const compatibleUsers = _.filter(users, (user, i) => {
      if(chart.type === 'LengthAgeInfant' || chart.type === 'WeightAgeInfant'){
        return moment().diff(moment(new Date(user.date_of_birth)), 'years') < 2
      }
      else{
        return moment().diff(moment(new Date(user.date_of_birth)), 'years') > 2
      }
    })

    // console.log("CU => ", compatibleUsers)

    if(inputLength === 0){
      return compatibleUsers
    }
    return _.filter(compatibleUsers, (user) => {
      return this.matchUserToTerm(user, value)
    })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsUpdateRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  getSuggestionValue = (suggestion) => {
    return `${suggestion.first_name} ${suggestion.last_name}`
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{`${suggestion.first_name} ${suggestion.last_name}`}</span>
    )
  }

  matchUserToTerm = (state, value) => {
    return (
      state.first_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      state.last_name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {
    this.setState({
      user: suggestion
    })
  }

  onPatientSelected = (e) => {
    e.preventDefault()
    if(this.state.user !== null){
      this.onUserSelected(this.state.user)
    }
    else{
      toastr.error('No patient has been selected')
    }
  }

  // onPatientSelected = () => {
  //   debugger;
  // }

  render(){
    const { user, users, value, suggestions } = this.state
    const inputProps = {
      placeholder: user === null ? 'Type patient name...' : `${user.first_name} ${user.last_name}`,
      value,
      onChange: this.onChange
    }

    return(
      <div className="chart-current-step">
        <SelectUserForm
          suggestions={suggestions}
          inputProps={inputProps}
          onPatientSelected={this.onPatientSelected}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionSelected={this.onSuggestionSelected}
        />
      </div>
    )
  }
}

export default ChartUserSelection
