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
      value: '',
      paperSettings: 'size'
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

  onChangePaperSettings = (e) => {
    this.setState({paperSettings: e.target.value})
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
    const { societies, society, value, paperSettings } = this.state
    const inputProps = {
      placeholder: 'Restaurant Name',
      value,
      onChange: this.onChange
    }
    return (
      <section className="meta-settings">
        <form className="meta-form" onSubmit={this.onSubmit}>
          <header className="row meta-row settings-area-unit">
            <div className="col-xs-12 settings-header-stripe">
              <h1>Step 1</h1>
            </div>
            <div className="col-sm-6 col-sm-push-3">
              <div className="row">
                <div className="col-sm-6">
                  <Autosuggest
                    suggestions={societies}
                    onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                  />
                </div>
                <div className="col-sm-6">
                  <input type="text" placeholder="Menu Name" name="menu_name" />
                </div>
                <div className="col-sm-12">
                  <span className="border-bottom">How will you print this file?</span>
                </div>
              </div>
            </div>
          </header>
          <div className="row meta-row settings-area-unit">
            <div className="col-xs-12 settings-header-stripe">
              <h1>Step 2</h1>
            </div>
            <div className="col-sm-6 col-sm-push-3">
              <div className="row">
                <div className="col-sm-8 col-sm-offset-2">
                  <select className="form-control" ref="papet_settings" defaultValue="size" onChange={this.onChangePaperSettings}>
                    <option value="size">Paper Size</option>
                    <option value="usage">Paper Usage</option>
                  </select>
                </div>
              </div>
              {paperSettings === 'size' &&
                <div className="row">
                  <div className="col-sm-8 col-sm-push-2">
                    <div className="row">
                      <div className="col-xs-4">
                        <label className="text-default">
                          <input type="radio" name="paper_size" value="letter" /><br/> Letter <br/> 8.5 x 11 in
                        </label>
                      </div>
                      <div className="col-xs-4">
                      <label className="text-default">
                        <input type="radio" name="paper_size" value="legal" /><br/> Legal <br/> 8.5 x 14 in
                      </label>
                      </div>
                      <div className="col-xs-4">
                        <label className="text-default">
                          <input type="radio" name="paper_size" value="tabloid" /><br/> Tabloid <br/> 11 x 17 in
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {paperSettings === 'usage' &&
                <div className="row">
                  <div className="col-sm-8 col-sm-push-2">
                    <div className="row">
                      <div className="col-xs-4">
                        <label className="text-default">
                          <input type="radio" name="paper_size" value="portrait__ONE_COLUMN" /><br/> One Side Vertical
                        </label>
                      </div>
                      <div className="col-xs-4">
                        <label className="text-default">
                          <input type="radio" name="paper_size" value="portrait__ONE_COLUMN_BOTH" disabled/><br/> Front & Back Vertical
                        </label>
                      </div>
                      <div className="col-xs-4">
                        <label className="text-default">
                          <input type="radio" name="paper_size" value="portrait__TWO_COLUMNS" disabled/><br/> Folded <br/>Front & Back (4 Pages)
                        </label>
                      </div>
                    </div>
                  </div>                
                  <div className="col-sm-8 col-sm-push-2">
                    <div className="row">
                      <div className="col-xs-4">
                        <label className="text-default">
                          <input type="radio" name="paper_size" value="landscape__ONE_COLUMN" /><br/> One Side Horizontal
                        </label>
                      </div>
                      <div className="col-xs-4">
                        <label className="text-default">
                          <input type="radio" name="paper_size" value="landscape__ONE_COLUMN_BOTH" disabled/><br/> Front & Back Horizontal
                        </label>
                      </div>
                      <div className="col-xs-4">
                        <label className="text-default">
                          <input type="radio" name="paper_size" value="landscape__TWO_COLUMNS" disabled/><br/> Folded <br/>Front & Back (4 Pages)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </form>
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