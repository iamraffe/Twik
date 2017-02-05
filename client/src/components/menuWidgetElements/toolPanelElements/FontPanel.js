import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import request from 'superagent'
import toastr from 'toastr'
import WebFont from 'webfontloader'
import Autosuggest from 'react-autosuggest'
import getFormData from 'get-form-data'

import * as fontActions from '../../../actions/fontActions'

class FontPanel extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
    // debugger;
    this.state = {
      primary_font: props.fontFamilies.primary_font,
      secondary_font: props.fontFamilies.secondary_font,
      alternate_font: props.fontFamilies.alternate_font,
      editing: 'none',
      allFonts: [],
      suggestions: [],
      value: '',
      selectedFont: {}
    }

    this.onClose = props.onClose
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      primary_font: nextProps.fontFamilies.primary_font,
      secondary_font: nextProps.fontFamilies.secondary_font,
      alternate_font: nextProps.fontFamilies.alternate_font,
    })
  }

  componentDidMount(){
    const req = request.get(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyC7HlLGjHVuNxsyJPfga9vdg-NR9ZYRd4w`)
    req.query({ format: 'json' })
    req.end((err, res)=>{
      if(res.statusCode === 200){
        this.setState({
          allFonts: res.body.items,
          suggestions: res.body.items.slice(0,20)
        })
        WebFont.load({
          google: {
            families: _.map(res.body.items.slice(0,20), (f, i) => {return f.family})
          }
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
    const { allFonts } = this.state

    if(inputLength === 0){
      return allFonts
    }
    let filteredFonts =  _.filter(allFonts, (font) => {
      return this.matchFontToTerm(font, value)
    }).slice(0, 20)
    if(filteredFonts.length > 0){
      WebFont.load({
        google: {
          families: _.map(filteredFonts, (f, i) => {return f.family})
        }
      })
    }
    return filteredFonts
  }

  onAutosuggestChange = (event, { newValue }) => {
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
    return `${suggestion.family}`
  }

  renderSuggestion = (suggestion) => {
    return (
      <span style={{fontFamily: suggestion.family}}>{`${suggestion.family}`}</span>
    )
  }

  matchFontToTerm = (state, value) => {
    return (
      state.family.toLowerCase().indexOf(value.toLowerCase()) !== -1 
    )
  }

  onSuggestionSelected = (event, font, { suggestion, suggestionValue, sectionIndex, method }, ) => {
    // console.log(event, suggestion, suggestionValue, sectionIndex, method, font)
    const fontsToLoad = `${suggestionValue}:${_.join(suggestion.variants, ',')}`
    // console.log(fontsToLoad)
    WebFont.load({
      google: {
        families: [fontsToLoad]
      }
    })
    // debugger;
    this.setState({
      selectedFont: suggestion,
      // value: ''
    })
  }

  onChange = (e, fontKey) => {
    e.preventDefault()
    const { changeFont } = this.props.fontActions
    const { selectedFont } = this.state
    const form = e.target
    const formData = getFormData(form)
    console.log(e, fontKey, this.state, formData)
    // const font = e.target.value
    // WebFont.load({
    //   google: {
    //     families: [font]
    //   }
    // })
    console.log({
      fontFamily: selectedFont.family,
      fontWeight: _.replace(formData.fontWeightAndStyle, 'italic', '') === 'regular' ? 'normal' : _.replace(formData.fontWeightAndStyle, 'italic', ''),
      fontStyle: _.endsWith(formData.fontWeightAndStyle, 'italic') ? 'italic' : 'normal',
      textTransform: formData.textTransform
    })
    changeFont(fontKey, {
      fontFamily: selectedFont.family,
      fontWeight: _.replace(formData.fontWeightAndStyle, 'italic', '') === 'regular' ? 'normal' : _.replace(formData.fontWeightAndStyle, 'italic', ''),
      fontStyle: _.endsWith(formData.fontWeightAndStyle, 'italic') ? 'italic' : 'normal',
      textTransform: formData.textTransform
    })
    this.setState({
      editing: 'none',
      value: '',
      selectedFont: {}
    })
  }

  onEditFont = (fontKey) => {
    this.setState({
      editing: fontKey,
      value: ''
    })
  }

  render(){
    const { primary_font, secondary_font, alternate_font, allFonts, editing, suggestions, value, selectedFont } = this.state

    const inputProps = {
      placeholder: selectedFont.family ? selectedFont.family : '',
      value,
      onChange: this.onAutosuggestChange
    }
    console.log(primary_font)
    if(allFonts.length > 0){
      return (
        <section className="font-panel tool-panel-element">
          <header>
            <h1>Font</h1>
            <span className="fa close-panel fa-times" onClick={this.onClose}></span>
          </header>
          {primary_font.fontFamily !== '' && editing !== 'primary_font' &&
            <article>
              <header onClick={(e) => {this.onEditFont('primary_font')}}>
                <h1 style={{...primary_font, cursor: 'pointer'}}>{primary_font.fontFamily}</h1>
              </header>
            </article>
          }
          {primary_font.fontFamily !== '' && editing === 'primary_font' &&
            <article>
              <h1 style={{fontSize: 16, textAlign: 'center', ...primary_font}}>Current font: <span style={{}}>{primary_font.fontFamily}</span></h1>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={(e, obj) => {this.onSuggestionSelected(e, 'primary_font', obj)}}
                alwaysRenderSuggestions={true}
              />
              {selectedFont.variants &&
                <form onSubmit={(e) => {this.onChange(e, 'primary_font')}}>
                  <select name="fontWeightAndStyle"  defaultValue="default" className="form-control">
                    <option value="default">Select a variant</option>
                    {_.map(selectedFont.variants, (variant, i) => {
                      return (
                        <option
                          key={i}
                          value={variant}
                          style={{
                            fontFamily: selectedFont.family,
                            fontWeight: _.replace(variant, 'italic', ''),
                            fontStyle: _.endsWith(variant, 'italic') ? 'italic' : 'normal',
                          }}
                        >
                          {selectedFont.family} - ({variant})
                        </option>
                      )
                    })}
                  </select>
                  
                  <div className="row">
                    <p style={{marginTop: 20, fontSize: 14, textAlign: 'center'}}>Should this text be always uppercase?</p>

                    <div className="col-xs-4 col-xs-offset-2">
                      <label className=" text-default radio-inline">
                        <input type="radio" name="textTransform" value='uppercase' /> Yes
                      </label>
                    </div>
                    <div className="col-xs-4 col-xs-offset-1">
                      <label className=" text-default radio-inline" style={{marginBottom: 25}}>
                        <input type="radio" name="textTransform" value='none' /> No
                      </label>
                    </div>
                    <button className="btn-link text-default" style={{fontSize: 18, margin: '0 auto 25px', display: 'block'}}>
                      I'm set! <span className="ion ion-ios-checkmark-outline"></span>
                    </button>
                  </div>
                  <hr style={{borderColor: '#310100'}}/>                 
                </form>
              }
            </article>
          }
          {secondary_font.fontFamily !== '' && editing !== 'secondary_font' &&
            <article>
              <header onClick={(e) => {this.onEditFont('secondary_font')}}>
                <h1 style={{...secondary_font, cursor: 'pointer'}}>{secondary_font.fontFamily}</h1>
              </header>
            </article>
          }
          {secondary_font.fontFamily !== '' && editing === 'secondary_font' && 
            <article>
              <h1 style={{fontSize: 16, textAlign: 'center', ...secondary_font}}>Current font: <span style={{}}>{secondary_font.fontFamily}</span></h1>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={(e, obj) => {this.onSuggestionSelected(e, 'secondary_font', obj)}}
                alwaysRenderSuggestions={true}
              />
              {selectedFont.variants &&
                <form onSubmit={(e) => {this.onChange(e, 'secondary_font')}}>
                  <select name="fontWeightAndStyle"  defaultValue="default" className="form-control">
                    <option value="default">Select a variant</option>
                    {_.map(selectedFont.variants, (variant, i) => {
                      return (
                        <option
                          key={i}
                          value={variant}
                          style={{
                            fontFamily: selectedFont.family,
                            fontWeight: _.replace(variant, 'italic', ''),
                            fontStyle: _.endsWith(variant, 'italic') ? 'italic' : 'normal',
                          }}
                        >
                          {selectedFont.family} - ({variant})
                        </option>
                      )
                    })}
                  </select>
                  
                  <div className="row">
                    <p style={{marginTop: 20, fontSize: 14, textAlign: 'center'}}>Should this text be always uppercase?</p>

                    <div className="col-xs-4 col-xs-offset-2">
                      <label className=" text-default radio-inline">
                        <input type="radio" name="textTransform" value='uppercase' /> Yes
                      </label>
                    </div>
                    <div className="col-xs-4 col-xs-offset-1">
                      <label className=" text-default radio-inline" style={{marginBottom: 25}}>
                        <input type="radio" name="textTransform" value='none' /> No
                      </label>
                    </div>
                    <button className="btn-link text-default" style={{fontSize: 18, margin: '0 auto 25px', display: 'block'}}>
                      I'm set! <span className="ion ion-ios-checkmark-outline"></span>
                    </button>
                  </div>
                  <hr style={{borderColor: '#310100'}}/>                 
                </form>
              }
            </article>
          }
          {alternate_font.fontFamily !== '' && editing !== 'alternate_font' &&
            <article>
              <header onClick={(e) => {this.onEditFont('alternate_font')}}>
                <h1 style={{...alternate_font, cursor: 'pointer'}}>{alternate_font.fontFamily}</h1>
              </header>
            </article>
          }
          {alternate_font.fontFamily !== '' && editing === 'alternate_font' &&
            <article>
              <h1 style={{fontSize: 16, textAlign: 'center', ...alternate_font}}>Current font: <span style={{}}>{alternate_font.fontFamily}</span></h1>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={(e, obj) => {this.onSuggestionSelected(e, 'alternate_font', obj)}}
                alwaysRenderSuggestions={true}
              />
              {selectedFont.variants &&
                <form onSubmit={(e) => {this.onChange(e, 'alternate_font')}}>
                  <select name="fontWeightAndStyle"  defaultValue="default" className="form-control">
                    <option value="default">Select a variant</option>
                    {_.map(selectedFont.variants, (variant, i) => {
                      return (
                        <option
                          key={i}
                          value={variant}
                          style={{
                            fontFamily: selectedFont.family,
                            fontWeight: _.replace(variant, 'italic', ''),
                            fontStyle: _.endsWith(variant, 'italic') ? 'italic' : 'normal',
                          }}
                        >
                          {selectedFont.family} - ({variant})
                        </option>
                      )
                    })}
                  </select>
                  
                  <div className="row">
                    <p style={{marginTop: 20, fontSize: 14, textAlign: 'center'}}>Should this text be always uppercase?</p>

                    <div className="col-xs-4 col-xs-offset-2">
                      <label className=" text-default radio-inline">
                        <input type="radio" name="textTransform" value='uppercase' /> Yes
                      </label>
                    </div>
                    <div className="col-xs-4 col-xs-offset-1">
                      <label className=" text-default radio-inline" style={{marginBottom: 25}}>
                        <input type="radio" name="textTransform" value='none' /> No
                      </label>
                    </div>
                    <button className="btn-link text-default" style={{fontSize: 18, margin: '0 auto 25px', display: 'block'}}>
                      I'm set! <span className="ion ion-ios-checkmark-outline"></span>
                    </button>
                  </div>
                  <hr style={{borderColor: '#310100'}}/>                 
                </form>
              }
            </article>
          }
          <footer>
            {editing === 'none' && <h1>Pick a font to replace</h1>}
          </footer>
        </section>
      )
    }
    else{
      return (
        <div>Loading...</div>
      )
    }
  }
}

FontPanel.propTypes = {

}

function mapStateToProps(state, ownProps){
  // console.log(state)
  return {
    zoom: state.zoom,
    fontFamilies: state.fontFamilies,
    structure: state.structure,
    meta: state.meta,
    colors: state.colors,
    styles: state.styles
  }
}

function mapDispatchToProps(dispatch){
  return {
    fontActions: bindActionCreators(fontActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FontPanel)