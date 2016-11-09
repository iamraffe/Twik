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
        toastr.success("Please check your email for instructions", "You're account has been created!")
      })
    }
    else{
      toastr.error("Please check and try again", "Oops! Email field can't be blank")
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
        toastr.error('Looks like that subdomain has already been taken been taken', 'Darn it!')
      }
      else{
        this.setState({
          canSubmit: true
        })
      }
    }).catch((ex) => {
      toastr.error(ex)
    })
  }

  render(){
    const { toggleSignUp, canSubmit, completed, guessWhat } = this.state

    return(
      <div>
        {!toggleSignUp && !completed &&
          <div className="action-buttons">
            <button className="btn btn-primary btn-block">Log In!</button>
            <button className="btn btn-primary btn-block" onClick={(e) => {this.onToggleSignUp()}}>Sign Up</button>
          </div>
        }
        {toggleSignUp &&
          <div className="sign-up-form">
            <form onSubmit={this.onSignUp}>
              <header>
                <h1>Sign up, yeah?</h1>
              </header>
              <div className="row form-group">
                <div className="col-xs-12">
                  <div className="input-group">
                    <input type="text" className="form-control" name="subdomain" placeholder="subdomain" onBlur={this.verifySubdomain} autoFocus={true} />
                    <div className="input-group-addon text-primary">.twik.us</div>
                  </div>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-xs-12">
                  <input type="email" placeholder="your email address" name="email" className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <button className="btn btn-primary btn-block" disabled={!canSubmit}>Let's go</button>
                </div>
              </div>
            </form>
          </div>
        }
        {completed && 
          <section className="sign-up-completed">
            <header>
              <h1>Awesome!</h1>
              <h2>Now guess what?</h2>
              <button className="btn btn-primary btn-block" onClick={this.onGuessWhat}>What?</button>
            </header>
            {guessWhat &&
              <div className="guess-what">
                <p>It's Hamme... erh, email confirmation time.</p>
                <p>See you on the other side!</p>
              </div>
            }
          </section>
        }
      </div>
    )
  }
}

export default RegistrationWidget