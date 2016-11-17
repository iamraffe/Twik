import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import toastr from 'toastr'
import Autosuggest from 'react-autosuggest'

class MetaWidget extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      societies: [],
      society: {},
      value: ''
    }
  }

  componentWillReceiveProps(nextProps){
  }

  componentDidMount(){
    const req = request.get(`/societies`)
    req.query({ format: 'json' })
    req.end((err, res)=>{
      console.log(res)
      if(res.statusCode === 200){
        this.setState({
          societies: res.body
        })
      }
      else{
        toastr.error("Error loading fonts")
        console.log("ERROR => ", err)
      }
    })
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    const { societies } = this.state

    if(inputLength === 0){
      return societies
    }
    return _.filter(societies, (society) => {
      return this.matchSocietyToTerm(society, value)
    })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsUpdateRequested = ({ value }) => {
    this.setState({
      societies: this.getSuggestions(value)
    })
  }

  getSuggestionValue = (suggestion) => {
    return `${suggestion.name}`
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{`${suggestion.name}`}</span>
    )
  }

  matchSocietyToTerm = (society, value) => {
    return (
      society.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 
    )
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {
    this.setState({
      society: suggestion
    })
  }

  onSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    const form = e.target
  }

  render(){
    const { societies, society, value } = this.state
    const inputProps = {
      placeholder: 'Restaurant Name',
      value,
      onChange: this.onChange
    }
    return (
      <section className="meta-settings">
        <header className="row">
          <div className="col-xs-12">
            <img src={this.props.logo} alt="Twik Robot" style={{display: 'block', margin: '0 auto', maxHeight: 75}}/>
          </div>
          <form className="meta-form" onSubmit={this.onSubmit}>
            <div className="col-xs-12">
              <div className="row meta-row">
                <div className="col-sm-4 col-sm-offset-4">
                  <div className="row">
                    <div className="col-xs-1">
                      <span className="meta-step">1</span>
                    </div>
                    <div className="col-xs-11">
                      <Autosuggest
                        suggestions={societies}
                        onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={this.onSuggestionSelected}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="row meta-row">
                <div className="col-sm-4 col-sm-offset-4">
                  <div className="row">
                    <div className="col-xs-1">
                      <span className="meta-step">2</span>
                    </div>
                    <div className="col-xs-11">
                      <input type="text" placeholder="Menu Name" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="row meta-row">
                <div className="col-sm-4 col-sm-offset-4">
                  <div className="row">
                    <div className="col-xs-1">
                      <span className="meta-step">3</span>
                    </div>
                    <div className="col-xs-11">
                      <p className="text-default text-baloo">How will this menu be printed?</p>
                      <div className="radio">
                        <label className="text-default text-baloo">
                          <input type="radio" name="optionsRadios" id="" value="option1" />
                          Home Printer
                        </label>
                      </div>
                      <div className="radio">
                        <label className="text-default text-baloo">
                          <input type="radio" name="optionsRadios" id="" value="option2" />
                          Professional Printer
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="meta-separator"/>
            </div>
            <div className="col-xs-12">
              <div className="row meta-row">
                <div className="col-sm-4 col-sm-offset-4">
                  <div className="row">
                    <div className="col-xs-1">
                      <span className="meta-step">4</span>
                    </div>
                    <div className="col-xs-11">
                      <p className="text-default text-baloo">Paper Size</p>
                      <label className="text-default radio-inline">
                        <input type="radio" name="paper_size" value="letter" /><br/> Letter <br/> 8.5 x 11 in
                      </label>
                      <label className="text-default radio-inline">
                        <input type="radio" name="paper_size" value="legal" /><br/> Legal <br/> 8.5 x 14 in
                      </label>
                      <label className="text-default radio-inline">
                        <input type="radio" name="paper_size" value="tabloid" /><br/> Tabloid <br/> 11 x 17 in
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="row meta-row">
                <div className="col-sm-4 col-sm-offset-4">
                  <div className="row">
                    <div className="col-xs-1">
                      <span className="meta-step">5</span>
                    </div>
                    <div className="col-xs-11">
                      <p className="text-default text-baloo">Paper Usage:</p>
                      <div className="row">
                        <div className="col-xs-12">
                          <label className="text-default radio-inline">
                            <input type="radio" name="paper_size" value="portrait__ONE_COLUMN" /><br/> One Side Vertical
                          </label>
                          <label className="text-default radio-inline">
                            <input type="radio" name="paper_size" value="portrait__ONE_COLUMN_BOTH" disabled/><br/> Front & Back Vertical
                          </label>
                          <label className="text-default radio-inline">
                            <input type="radio" name="paper_size" value="portrait__TWO_COLUMNS" disabled/><br/> Folded <br/>Front & Back (4 Pages)
                          </label>
                        </div>
                        <div className="col-xs-12">
                          <label className="text-default radio-inline">
                            <input type="radio" name="paper_size" value="landscape__ONE_COLUMN" /><br/> One Side Horizontal
                          </label>
                          <label className="text-default radio-inline">
                            <input type="radio" name="paper_size" value="landscape__ONE_COLUMN_BOTH" disabled/><br/> Front & Back Horizontal
                          </label>
                          <label className="text-default radio-inline">
                            <input type="radio" name="paper_size" value="landscape__TWO_COLUMNS" disabled/><br/> Folded <br/>Front & Back (4 Pages)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="meta-separator"/>
            </div>
          </form>
        </header>
      </section>
    )
  }
}

MetaWidget.propTypes = {
}

function mapStateToProps(state, ownProps){
  return {
    meta: state.meta
  }
}

function mapDispatchToProps(dispatch){
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaWidget)