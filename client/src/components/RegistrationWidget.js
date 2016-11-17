import React from 'react'
import toastr from 'toastr'
import getFormData from 'get-form-data'

import API from '../api/api'
import '../styles/registration_widget.scss'

class RegistrationWidget extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      toggleSignUp: false,
      canSubmit: false,
      completed: false,
      guessWhat: false
    }
  }

  onToggleSignUp = () => {
    this.setState({
      toggleSignUp: !this.state.toggleSignUp
    })
  }

  onGuessWhat = () => {
    this.setState({
      guessWhat: !this.state.guessWhat
    })
  }

  onSignUp = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = getFormData(form)
    if(formData.email !== ''){
      const account = {
        subdomain: formData.subdomain,
        owner_attributes: {
          email: formData.email
        }
      }
      API.post('/accounts', {account}).then((response) => {
        if (response.ok === false) {
            throw Error(response.errors)
        }
        this.setState({
          completed: true,
          toggleSignUp: false
        })
        toastr.success("Please check your email for instructions", "You're account has been created!", {positionClass: "toast-top-center"})
      })
    }
    else{
      toastr.error("Please check and try again", "Oops! Email field can't be blank", {positionClass: "toast-top-center"})
    }
  }

  verifySubdomain = (e) => {
    fetch('/accounts/verify.json?subdomain='+e.target.value)
    .then((response) => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response.json()
    }).then((json) => {
      if(json !== 0){
        toastr.error('Looks like that subdomain has already been taken been taken', 'Darn it!', {positionClass: "toast-top-center"})
      }
      else{
        this.setState({
          canSubmit: true
        })
      }
    }).catch((ex) => {
      toastr.error(ex, '', {positionClass: "toast-top-center"})
    })
  }

  render(){
    const { toggleSignUp, canSubmit, completed, guessWhat } = this.state

    return(
      <div>
        <div className="sign-up-form col-md-8">
          <form onSubmit={this.onSignUp}>
            <div className="row form-group">
              <div className="col-xs-12">
                <div className="input-group">
                  <input type="text" className="form-control" name="subdomain" placeholder="claim your twik name" onBlur={this.verifySubdomain} autoFocus={true} />
                  <div className="input-group-addon text-primary">.twik.us</div>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-xs-9">
                <input type="email" placeholder="email" name="email" className="form-control" />
              </div>
              <div className="col-xs-3">
                <button className="btn btn-primary btn-small" disabled={!canSubmit}>Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegistrationWidget
