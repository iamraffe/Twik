import React, { PropTypes } from 'react'
import getFormData from 'get-form-data'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {Motion, spring} from 'react-motion'
import toastr from 'toastr'
import API from '../api/api'
import './registration.scss'

class RegistrationWidget extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      mode: 'patient',
      patientFound: false,
      date: moment(),
      height: 350,
      userId: null,
      attemptsLeft: 3
    }
  }

  modeSwitch = (mode) => {
    this.setState({
      mode
    })
  }

  dateOfBirthChange = (e) => {
    this.setState({
      date: e
    })
  }

  searchPatient = (e) => {
    e.preventDefault()
    const form = document.getElementById('patient-registration-form')
    const formData = getFormData(form)
    console.log(getFormData(form))
    if(this.state.attemptsLeft > 0){
      fetch(`/users/search?first_name=${formData.firstName}&last_name=${formData.lastName}&date_of_birth=${formData.dateOfBirth}&phone_number=${formData.phoneNumber}`)
      .then((response) => {
        return response.json()
      }).then((parsedResponse) => {
        console.log("parsedResponse => ", parsedResponse)
        if(parsedResponse !== null && parsedResponse.registered === false){
          this.setState({
            patientFound: true,
            height: 0,
            userId: parsedResponse.id
          })
        }
        else if(parsedResponse !== null && parsedResponse.registered === true){
          toastr.error("Oops! Seems you've already set a password.")
        }
        else{
          toastr.error(`You have ${this.state.attemptsLeft} attempts left. If you require assistance get in touch with your Private Medical Provider.`, "Oops! We weren't able to find you. Please double check the information entered and try again.")
          this.setState({
            attemptsLeft: this.state.attemptsLeft === 0 ? 0 : this.state.attemptsLeft-1
          })
        }
      })
    }
    else{
      toastr.error(`You have 0 attempts left. Get in touch with your Private Medical Provider.`)
    }

  }

  passwordSubmit = (e) => {
    e.preventDefault()
    const form = document.getElementById('password-form')
    const formData = getFormData(form)
    console.log(getFormData(form))

    if(formData['password'].length > 7 &&
    formData['password'] === formData['password_confirmation']){
      API.put(`/users/${this.state.userId}`, {user: formData}).then((response) => {
        console.log(response)
        toastr.success("Redirecting...", "Congratulations! Your password has been set")
        setTimeout(() => { window.location.href='/' }, 3000)
      })
    }
    else{
      toastr.error("Passwords must match")
    }
  }

  showPassword = (ref) => {
    const input = this.refs[ref]
    const addon = this.refs[`${ref}-addon`]

    if(input.getAttribute('type') === 'text'){
      input.setAttribute('type', 'password')
      addon.innerHTML = '<span class="fa fa-eye"></span>'
    }
    else{
      input.setAttribute('type', 'text')
      addon.innerHTML = '<span class="fa fa-eye-slash text-danger"></span>'
    }

  }

  renderStaffRegistrationWidget = () => {
    return(
      <div>
        Let's register you, staffer!
      </div>
    )
  }

  renderPatientRegistrationWidget = () => {
    const { firstName, lastName, dateOfBirth, patientFound, date } = this.state
    console.log(this.state, spring(this.state.height))

    return(
      <div>
        <div className="row">
          <Motion style={{height: spring(this.state.height)}}>
            {({height}) =>
              <div className="patient-registration-widget">
                <div className="row">
                  <form id="patient-registration-form" onSubmit={this.searchPatient}>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="firstName" className="col-sm-4 control-label">First Name</label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control" name="firstName" />
                        </div>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="lastName" className="col-sm-4 control-label">Last Name</label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control" name="lastName" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="dateOfBirth" className="col-sm-4 control-label">Date of Birth</label>
                        <div className="col-sm-8">
                          <DatePicker
                            isClearable={true}
                            name={`dateOfBirth`}
                            placeholderText="Click to select a date"
                            showYearDropdown
                            dateFormatCalendar="MMMM"
                            className="form-control"
                            selected={date}
                            maxDate={moment().add(1, 'days')}
                            onChange={this.dateOfBirthChange}
                          />
                        </div>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="phoneNumber" className="col-sm-4 control-label">Phone Number</label>
                        <div className="col-sm-8">
                          <div className="input-group">
                            <div className="input-group-addon">+1</div>
                            <input type="number" type="number" className="form-control" name="phoneNumber" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12">
                        {!patientFound && <button className="btn btn-block btn-dark">Find me</button>}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            }
          </Motion>
        </div>
        <div className="row">
        {patientFound &&  <section className="password-form-wrapper">
                            <header>
                              <h1>Great, we've found you! The time has come to set a password</h1>
                              <hr />
                            </header>
                            <form id="password-form" onSubmit={this.passwordSubmit}>
                              <input type="hidden" name="registered" value="true" />
                              <div className="row">
                                <div className="form-group col-sm-12">
                                  <label htmlFor="user[email]" className="col-sm-2 control-label">Email</label>
                                  <div className="col-sm-10">
                                    <input ref="email" type="email" className="form-control" name="email"/>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-sm-6">
                                  <label htmlFor="user[password]" className="col-sm-4 control-label">Password</label>
                                  <div className="col-sm-8">
                                    <div className="input-group">
                                      <input ref="password" type="password" className="form-control" name="password"/>
                                      <div  ref="password-addon" className="input-group-addon" style={{cursor: 'pointer'}} data-toggle="tooltip" data-placement="top" title="Show Password" onClick={() => this.showPassword('password')}>
                                        <span className="fa fa-eye"></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group col-sm-6">
                                  <label htmlFor="user[password_confirmation]" className="col-sm-4 control-label">Confirm Password</label>
                                  <div className="col-sm-8">
                                    <div className="input-group">
                                      <input ref="passwordConfirmation" type="password" className="form-control" name="password_confirmation"/>
                                      <div ref="passwordConfirmation-addon" className="input-group-addon" style={{cursor: 'pointer'}} data-toggle="tooltip" data-placement="top" title="Show Password" onClick={() => this.showPassword('passwordConfirmation')}>
                                        <span className="fa fa-eye"></span>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xs-12">
                                  <button className="btn btn-block btn-dark">Continue</button>
                                </div>
                              </div>
                            </form>
                          </section>}
        </div>
        <div className="row devise-links">
          <div className="col-sm-6">
            <button
              className="btn btn-slim btn-link pull-left"
              onClick={() => window.location.href="/"}
            >
              Already have an account? Log in
            </button>
          </div>
          <div className="col-sm-6">
            <button
              className="btn btn-slim btn-link pull-right"
              onClick={() => this.modeSwitch('staff')}
            >
              Are you a staff member?
            </button>
          </div>
        </div>
      </div>
    )
  }

  render(){
    const { mode } = this.state

    if(mode === 'staff'){
      return this.renderStaffRegistrationWidget()
    }
    else{
      return this.renderPatientRegistrationWidget()
    }
  }
}

export default RegistrationWidget
