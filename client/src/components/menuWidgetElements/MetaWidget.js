import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import toastr from 'toastr'
import Autosuggest from 'react-autosuggest'
import getFormData from 'get-form-data'

import * as metaActions from '../../actions/metaActions'

class MetaWidget extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      societies: [],
      society: {},
      value: '',
      paperSettings: 'size',
      templates: props.templates,
      filteredTemplates: props.templates,
      canSubmit: false
    }
  }

  componentWillReceiveProps(nextProps){
  }



  componentDidMount(){
    const req = request.get(`/societies`)
    req.query({ format: 'json' })
    req.end((err, res)=>{
      if(res.statusCode === 200){
        this.setState({
          societies: res.body.societies
        })
      }
      else{
        toastr.error("Error loading fonts")
        console.log("ERROR => ", err)
      }
    })
    _.each(document.querySelectorAll('input[name="size"]'), input => {
      input.addEventListener("click", () => {
        this.setState({paperSettings: "usage"})
        // console.log("clicked");
      })
    })
    // This will disable all the children of the div
    this.disableLastStep(true)
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
  onBlur = (event, { focusedSuggestion }) => {
    if (focusedSuggestion !== null) {
      this.setState({
        value: focusedSuggestion.name,
        society: focusedSuggestion
      });
    }
  }
  // onBlur = (event, wat) => {

  //   debugger;
  // }

  onSuggestionsUpdateRequested = ({ value }) => {
    this.setState({
      societies: this.getSuggestions(value)
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      societies: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      societies: []
    });
  };

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

  disableLastStep = (bool) => {
    var nodes = document.getElementById("last-step").getElementsByTagName('*')
    _.each(nodes, input => {
      input.disabled = bool
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { society, value } = this.state
    const form = e.target
    let restaurant = {
      name: society.name ? society.name : value,
      id: society.id ? society.id : null
    }
    const formData = getFormData(form)

    this.props.metaActions.setMetaInfo({
      society: restaurant,
      ..._.omit(formData, ['paperUsage']),
      orientation: formData.paperUsage.split('__')[0],
      layout: formData.paperUsage.split('__')[1],
      multiPage: formData.paperUsage.split('__')[2],
      allows: JSON.parse(formData.template).allows,
      accepts: JSON.parse(formData.template).accepts,
      wildcards: JSON.parse(formData.template).wildcards,
    })
    this.props.onSetStep('widget')
  }

  matchTemplateToSettings = (l, paperUsage) => {
    const orientation = paperUsage.split('__')[0]
    const layout = paperUsage.split('__')[1]
    const multiPage = paperUsage.split('__')[2]
    return l.name === layout && l.multiPage.toString() === multiPage && l.orientation === orientation
  }

  filterTemplates = () => {
    const { templates } = this.state
    const printOption = document.querySelector('input[name="printAt"]:checked')
    const paperUsage = document.querySelector('input[name="paperUsage"]:checked')

    if(printOption !== null && paperUsage !== null){
      this.setState({
        filteredTemplates:  _.filter(templates, (template) => {
                              return (_.find(template.structure.layouts, (layout) => {
                                return this.matchTemplateToSettings(layout, paperUsage.value)
                              })) && (_.findIndex(template.printAt, (p) => { return p === printOption.value }) !== -1)
                            })
      })
    }
  }

  canSubmit = (e) => {
    const printOption = document.querySelector('input[name="printAt"]:checked')
    const paperUsage = document.querySelector('input[name="paperUsage"]:checked')
    const paperSize = document.querySelector('input[name="size"]:checked')
    const menuName = document.querySelector('input[name="name"]')
    const { value } = this.state

    if( printOption !== null &&
        paperUsage !== null &&
        paperSize !== null &&
        menuName.value !== '' &&
        value !== '' ){
      this.disableLastStep(false)
      this.setState({canSubmit: true})
    }
  }

  render(){
    const { societies, society, value, paperSettings, templates, filteredTemplates, canSubmit } = this.state
    const inputProps = {
      placeholder: 'Project Name',
      value,
      onChange: this.onChange,
      onBlur: this.onBlur
    }

    return (
      <section className="meta-settings">
        <form className="meta-form" onSubmit={this.onSubmit} onChange={(e) => {this.canSubmit(e)}}>
          <header className="row meta-row settings-area-unit">
            <div className="col-xs-12 settings-header-stripe">
              <h1>Step 1</h1>
            </div>
            <div className="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1">
              <div className="row">
                <div className="col-sm-6">
                  <Autosuggest
                    suggestions={societies}
                    focusFirstSuggestion={true}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                  />
                </div>
                <div className="col-sm-6">
                  <input type="text" placeholder="Filename" name="name" />
                </div>
                <div className="col-sm-12">
                  <span className="border-bottom">
                    How will you use the file?
                    <label className="text-default" style={{marginLeft: 50}}>
                      <input onClick={(e) => {this.filterTemplates()}} type="radio" name="printAt" value="home" style={{verticalAlign: -4, marginRight: 10}} />
                      I'll print it myself
                    </label>
                    <label className="text-default" style={{marginLeft: 50}}>
                      <input onClick={(e) => {this.filterTemplates()}} type="radio" name="printAt" value="pro" style={{verticalAlign: -4, marginRight: 10}} />
                      It'll be professionally printed
                    </label>
                    <label className="text-default" style={{marginLeft: 50}}>
                      <input onClick={(e) => {this.filterTemplates()}} type="radio" name="printAt" value="home" style={{verticalAlign: -4, marginRight: 10}} disabled/>
                      I just need the digital file
                    </label>
                    <label className="text-default" style={{marginLeft: 50}}>
                      <input onClick={(e) => {this.filterTemplates()}} type="radio" name="printAt" value="pro" style={{verticalAlign: -4, marginRight: 10}} disabled/>
                      HTML please!
                    </label>
                  </span>
                </div>
              </div>
            </div>
          </header>
          <div className="row meta-row settings-area-unit">
            <div className="col-xs-12 settings-header-stripe">
              <h1>Step 2</h1>
            </div>
            <div className="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1">
              <div className="row">
                <div className="col-sm-8 col-sm-offset-2">
                  <select className="form-control" ref="paper_settings" value={paperSettings} onChange={this.onChangePaperSettings}>
                    <option value="size">Paper Size</option>
                    <option value="usage">Paper Usage</option>
                  </select>
                </div>
              </div>
              <div className={`row ${paperSettings === 'size' ? '' : 'hide'}`}>
                <div className="col-sm-8 col-sm-offset-2">
                  <div className="row">
                    <div className="col-xs-4">
                      <label className="text-default">
                        <input type="radio" name="size" value="letter" /><br/> Letter <br/> 8.5 x 11 in
                      </label>
                    </div>
                    <div className="col-xs-4">
                    <label className="text-default">
                      <input type="radio" name="size" value="legal" /><br/> Legal <br/> 8.5 x 14 in
                    </label>
                    </div>
                    <div className="col-xs-4">
                      <label className="text-default">
                        <input type="radio" name="size" value="tabloid" /><br/> Tabloid <br/> 11 x 17 in
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`row ${paperSettings !== 'size' ? '' : 'hide'}`}>
                <div className="col-sm-8 col-sm-offset-2">
                  <div className="row">
                    <div className="col-xs-3 hide">
                      <label className="text-default">
                        <input onClick={(e) => {this.filterTemplates()}} type="radio" name="paperUsage" value="portrait__ONE_COLUMN__false" /><br/> One Side Vertical (One Column)
                      </label>
                    </div>
                    <div className="col-xs-3">
                      <label className="text-default">
                        <input onClick={(e) => {this.filterTemplates()}} type="radio" name="paperUsage" value="landscape__TWO_COLUMNS__true"/><br/> Folded <br/>Front & Back (4 Pages)
                      </label>
                    </div>
                    <div className="col-xs-3">
                      <label className="text-default">
                        <input onClick={(e) => {this.filterTemplates()}} type="radio" name="paperUsage" value="portrait__TWO_COLUMNS__false" /><br/> One Side Vertical (Two Columns)
                      </label>
                    </div>
                    <div className="col-xs-3 hide">
                      <label className="text-default">
                        <input onClick={(e) => {this.filterTemplates()}} type="radio" name="paperUsage" value="portrait__ONE_COLUMN__true"/><br/> Front & Back Vertical
                      </label>
                    </div>
                    <div className="col-xs-3 hide">
                      <label className="text-default">
                        <input onClick={(e) => {this.filterTemplates()}} type="radio" name="paperUsage" value="portrait__TWO_COLUMNS__true"/><br/> Folded <br/>Front & Back (4 Pages)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 col-sm-offset-2 hide">
                  <div className="row">
                    <div className="col-xs-3 hide">
                      <label className="text-default">
                        <input onClick={(e) => {this.filterTemplates()}} type="radio" name="paperUsage" value="landscape__ONE_COLUMN__false" /><br/> One Side Horizontal (One Column)
                      </label>
                    </div>
                    <div className="col-xs-3 hide">
                      <label className="text-default">
                        <input onClick={(e) => {this.filterTemplates()}} type="radio" name="paperUsage" value="landscape__TWO_COLUMNS__false" /><br/> One Side Horizontal (Two Columns)
                      </label>
                    </div>
                    <div className="col-xs-3 hide">
                      <label className="text-default">
                        <input onClick={(e) => {this.filterTemplates()}} type="radio" name="paperUsage" value="landscape__ONE_COLUMN__true"/><br/> Front & Back Horizontal
                      </label>
                    </div>
                    <div className="col-xs-3">
                      <label className="text-default">
                        <input onClick={(e) => {this.filterTemplates()}} type="radio" name="paperUsage" value="landscape__TWO_COLUMNS__true"/><br/> Folded <br/>Front & Back (4 Pages)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="last-step" className="row meta-row settings-area-unit">
            <div className="col-xs-12 settings-header-stripe">
              <h1>Step 3</h1>
            </div>
            <div className="col-lg-6 col-lg-offset-3 col-sm-10 col-sm-offset-1">
              <div className="row">
                {_.map(filteredTemplates, (template, i) => {
                  const className = (i % 2 === 0) ? 'col-sm-5' : 'col-sm-5 col-sm-offset-2'
                  return(
                    <div className={className} key={i}>
                        <label className="text-default">
                          <input type="radio" name="template" value={JSON.stringify(template)} />
                          <br/>
                          {template.name}
                        </label>
                      {}
                    </div>
                  )
                })}
                {filteredTemplates.length === 0 &&
                  <div className="col-sm-12">
                    <p className="text-center">
                      There are no templates with the selected configuration.
                    </p>
                    <p className="text-center">
                      Please, choose a different configuration.
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>
          {filteredTemplates.length > 0 && canSubmit &&
            <div className="row">
              <div className="col-xs-4 col-xs-offset-4">
                <button className="btn btn-block" style={{outline: 'none', fontSize: 16, display: 'block', margin: '0 auto 75px', color: 'white'}}>
                  Save
                </button>
              </div>
            </div>
          }
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
    metaActions: bindActionCreators(metaActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaWidget)
