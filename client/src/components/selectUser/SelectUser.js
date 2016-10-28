import React, {PropTypes} from 'react'
import _ from 'lodash'
import * as chartActions from '../../actions/chartActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toastr from 'toastr'
import SelectUserForm from './SelectUserForm'

class SelectUser extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      value: props.chart.user !== null ? `${props.chart.user.first_name} ${props.chart.user.last_name}` : '',
      suggestions: [],
      users: props.users,
      user: props.chart.user !== null ? props.chart.user : null
    }

    this.onChange = this.onChange.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.getSuggestions = this.getSuggestions.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.patientSelected = this.patientSelected.bind(this)
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    const { users } = this.state
    if(inputLength === 0){
      return users
    }
    return _.filter(users, (user) => {
      return this.matchUserToTerm(user, value)
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.users.length === 0) {
      this.setState({
        users: Object.assign({}, nextProps.users)
      })
    }
    else if(this.props.user === null && nextProps.user !== null){
      this.setState({
        user: nextProps.user,
        value: `${nextProps.user.first_name} ${nextProps.user.last_name}`
      })
    }
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  getSuggestionValue(suggestion) {
    return `${suggestion.first_name} ${suggestion.last_name}`
  }

  renderSuggestion(suggestion) {
    return (
      <span>{`${suggestion.first_name} ${suggestion.last_name}`}</span>
    )
  }

  matchUserToTerm (state, value) {
    return (
      state.first_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      state.last_name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }){
    this.setState({
      user: suggestion
    })
  }

  patientSelected(e){
    e.preventDefault()
    if(this.state.user !== null){
      let submitLocation = {pathname: `/charts/engine/data-input`}
      this.props.actions.selectUser(this.state.user)
      this.context.router.push(submitLocation)
    }
    else{
      toastr.error('No patient has been selected')
    }
  }

  render () {
    const { user, users, value, suggestions } = this.state
    const inputProps = {
      placeholder: user === null ? 'Type patient name...' : `${user.first_name} ${user.last_name}`,
      value,
      onChange: this.onChange
    }

    return (
      <div>
        <div className="col-xs-3">
          <button name="back_button" type="submit" className="btn-back btn btn-link">
            <span className="fa fa-arrow-left"></span>
            <span className="text">Back</span>
          </button>
        </div>
        <section className="row chart-current-step">
          <SelectUserForm
            patientSelected={this.patientSelected}
            suggestions={suggestions}
            inputProps={inputProps}
            onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
          />
        </section>
      </div>

    )
  }
}

//Pull in the React Router context so router is available on this.context.router.
SelectUser.contextTypes = {
  router: PropTypes.object
}

SelectUser.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps){
  return {
    users: state.users,
    chart: state.chart
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(chartActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectUser)
